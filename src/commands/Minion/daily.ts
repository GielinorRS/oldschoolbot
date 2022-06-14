import { CommandStore, KlasaMessage, KlasaUser } from 'klasa';

import { COINS_ID, dailyResetTime, Emoji, SupportServer } from '../../lib/constants';
import pets from '../../lib/data/pets';
import { getRandomTriviaQuestion } from '../../lib/roboChimp';
import { ClientSettings } from '../../lib/settings/types/ClientSettings';
import { UserSettings } from '../../lib/settings/types/UserSettings';
import dailyRoll from '../../lib/simulation/dailyTable';
import { BotCommand } from '../../lib/structures/BotCommand';
import { formatDuration, isWeekend, roll, stringMatches, updateGPTrackSetting } from '../../lib/util';

const options = {
	max: 1,
	time: 13_000,
	errors: ['time']
};

export function isUsersDailyReady(user: KlasaUser): { isReady: true } | { isReady: false; durationUntilReady: number } {
	const currentDate = new Date().getTime();
	const lastVoteDate = user.settings.get(UserSettings.LastDailyTimestamp);
	const difference = currentDate - lastVoteDate;

	if (difference < dailyResetTime) {
		const duration = Date.now() - (lastVoteDate + dailyResetTime);
		return { isReady: false, durationUntilReady: duration };
	}

	return { isReady: true };
}

export default class DailyCommand extends BotCommand {
	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			altProtection: true,
			cooldown: 5,
			categoryFlags: ['minion'],
			examples: ['+daily'],
			description:
				'Allows you to answer a trivia question twice daily for some small amount of GP and random items from Diangos store.'
		});
	}

	async run(msg: KlasaMessage) {
		if (msg.channel.id === '342983479501389826') return;
		const check = isUsersDailyReady(msg.author);
		if (!check.isReady) {
			return msg.channel.send(
				`**${Emoji.Diango} Diango says...** You can claim your next daily in ${formatDuration(
					check.durationUntilReady
				)}.`
			);
		}

		await msg.author.settings.update(UserSettings.LastDailyTimestamp, new Date().getTime());

		const { question, answers } = await getRandomTriviaQuestion();

		await msg.channel.send(`**${Emoji.Diango} Diango asks ${msg.author.username}...** ${question}`);
		try {
			const collected = await msg.channel.awaitMessages({
				...options,
				filter: answer =>
					answer.author.id === msg.author.id &&
					Boolean(answer.content) &&
					answers.some(_ans => stringMatches(_ans, answer.content))
			});
			const winner = collected.first();
			if (winner) return this.reward(msg, true);
		} catch (err) {
			return this.reward(msg, false);
		}
	}

	async reward(msg: KlasaMessage, triviaCorrect: boolean) {
		const user = msg.author;

		const guild = this.client.guilds.cache.get(SupportServer);
		const member = await guild?.members.fetch(user).catch(() => null);

		const loot = dailyRoll(3, triviaCorrect);

		const bonuses = [];

		if (isWeekend()) {
			loot[COINS_ID] *= 2;
			bonuses.push(Emoji.MoneyBag);
		}

		if (member) {
			loot[COINS_ID] = Math.floor(loot[COINS_ID] * 1.5);
			bonuses.push(Emoji.OSBot);
		}

		if (roll(73)) {
			loot[COINS_ID] = 0;
			bonuses.push(Emoji.Joy);
		}

		if (roll(5000)) {
			if (roll(2)) {
				bonuses.push(Emoji.Bpaptu);
			} else {
				loot[COINS_ID] += 1_000_000_000;
				bonuses.push(Emoji.Diamond);
			}
		}

		if (!triviaCorrect) {
			loot[COINS_ID] = 0;
		} else if (loot[COINS_ID] <= 1_000_000_000) {
			// Correct daily gives 10% more cash if the jackpot is not won
			loot[COINS_ID] = Math.floor(loot[COINS_ID] * 1.1);
		}

		// Ensure amount of GP is an integer
		loot[COINS_ID] = Math.floor(loot[COINS_ID]);

		// Check to see if user is iron and remove GP if true.
		if (user.isIronman) {
			delete loot[COINS_ID];
		}

		const correct = triviaCorrect ? 'correct' : 'incorrect';
		const reward = triviaCorrect
			? "I've picked you some random items as a reward..."
			: 'Even though you got it wrong, heres a little reward...';

		let dmStr = `${bonuses.join('')} **${Emoji.Diango} Diango says..** That's ${correct}! ${reward}\n`;

		const hasSkipper = msg.author.usingPet('Skipper') || msg.author.bank().amount('Skipper') > 0;
		if (!msg.author.isIronman && triviaCorrect && hasSkipper) {
			loot[COINS_ID] = Math.floor(loot[COINS_ID] * 1.5);
			dmStr +=
				'\n<:skipper:755853421801766912> Skipper has negotiated with Diango and gotten you 50% extra GP from your daily!';
		}

		if (triviaCorrect && roll(13)) {
			const pet = pets[Math.floor(Math.random() * pets.length)];
			const userPets = {
				...user.settings.get(UserSettings.Pets)
			};
			if (!userPets[pet.id]) userPets[pet.id] = 1;
			else userPets[pet.id]++;

			await msg.author.settings.sync(true);
			await user.settings.update(UserSettings.Pets, { ...userPets });

			dmStr += `\n**${pet.name}** pet! ${pet.emoji}`;
		}

		if (roll(2500)) {
			loot[741] = 1;
		}

		if (loot[COINS_ID] > 0) {
			updateGPTrackSetting(this.client, ClientSettings.EconomyStats.GPSourceDaily, loot[COINS_ID]);
		} else {
			delete loot[COINS_ID];
		}

		const { itemsAdded, previousCL } = await user.addItemsToBank({ items: loot, collectionLog: true });

		return msg.channel.sendBankImage({
			bank: itemsAdded,
			user: msg.author,
			title: `${msg.author.username}'s Daily`,
			content: dmStr,
			cl: previousCL
		});
	}
}
