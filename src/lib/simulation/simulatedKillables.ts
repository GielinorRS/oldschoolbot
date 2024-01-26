import { randInt } from 'e';
import { Bank } from 'oldschooljs';

import { DOANonUniqueTable } from '../../tasks/minions/bso/doaActivity';
import { chanceOfDOAUnique, pickUniqueToGiveUser } from '../depthsOfAtlantis';
import { roll } from '../util';
import { WintertodtCrate } from './wintertodt';

interface SimulatedKillable {
	name: string;
	loot: (quantity: number) => Bank;
}

export const simulatedKillables: SimulatedKillable[] = [
	{
		name: 'Wintertodt',
		loot: (quantity: number) => {
			const loot = new Bank();
			for (let i = 0; i < quantity; i++) {
				const points = randInt(1000, 5000);

				loot.add(
					WintertodtCrate.open({
						points,
						itemsOwned: {},
						skills: {
							firemaking: 99,
							herblore: 99,
							woodcutting: 99,
							crafting: 99,
							fishing: 99,
							mining: 99,
							farming: 99
						},
						firemakingXP: 1
					})
				);
			}
			return loot;
		}
	},
	{
		name: 'Depths of Atlantis (DOA) - Solo',
		loot: (quantity: number) => {
			const chanceOfUnique = chanceOfDOAUnique(1, false);
			const loot = new Bank();
			for (let i = 0; i < quantity; i++) {
				if (roll(chanceOfUnique)) {
					loot.add(pickUniqueToGiveUser(loot));
				} else {
					loot.add(DOANonUniqueTable.roll());
				}
			}
			return loot;
		}
	}
];