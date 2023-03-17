import { Bank } from 'oldschooljs';

import itemID from '../../../../util/itemID';
import { Mixable } from '../../../types';

const Potions: Mixable[] = [
	{
		name: 'Attack potion (3)',
		aliases: ['attack potion', 'attack', 'attack potion (3)'],
		id: itemID('Attack potion (3)'),
		level: 3,
		xp: 25,
		inputItems: new Bank().add('guam potion (unf)').add('Eye of newt'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Antipoison (3)',
		aliases: ['antipoison (3)', 'antipoison'],
		id: itemID('Antipoison (3)'),
		level: 5,
		xp: 37.5,
		inputItems: new Bank().add('Marrentill potion (unf)', 1).add('Unicorn horn dust', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Strength potion (3)',
		aliases: ['strength potion (3)', 'strength potion', 'strength'],
		id: itemID('Strength potion (3)'),
		level: 12,
		xp: 50,
		inputItems: new Bank().add('Tarromin potion (unf)').add('Limpwurt root'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Serum 207 (3)',
		aliases: ['serum 207 (3)', 'serum 207'],
		id: itemID('Serum 207 (3)'),
		level: 15,
		xp: 50,
		inputItems: new Bank().add('Tarromin potion (unf)').add('Ashes'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Compost potion (3)',
		aliases: ['compost potion (3)', 'compost potion', 'compost'],
		id: itemID('Compost potion (3)'),
		level: 22,
		xp: 60,
		inputItems: new Bank().add('Harralander potion (unf)').add('Volcanic ash'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Restore potion (3)',
		aliases: ['restore potion (3)', 'restore potion', 'restore'],
		id: itemID('restore potion (3)'),
		level: 22,
		xp: 62.5,
		inputItems: new Bank().add('Harralander potion (unf)', 1).add("red spiders' eggs", 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Guthix balance (3)',
		aliases: ['guthix balance (3)', 'guthix balance'],
		id: itemID('Guthix balance (3)'),
		level: 22,
		xp: 50,
		inputItems: new Bank().add('Restore potion (3)', 1).add('Garlic', 1).add('silver dust', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Energy potion (3)',
		aliases: ['energy potion (3)', 'energy potion', 'energy'],
		id: itemID('Energy potion (3)'),
		level: 26,
		xp: 67.5,
		inputItems: new Bank().add('Harralander potion (unf)', 1).add('chocolate dust', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Defence potion (3)',
		aliases: ['defence potion (3)', 'defence potion', 'defence'],
		id: itemID('Defence potion (3)'),
		level: 30,
		xp: 75,
		inputItems: new Bank().add('Ranarr potion (unf)').add('White berries'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Agility potion (3)',
		aliases: ['agility potion (3)', 'agility potion', 'agility'],
		id: itemID('Agility potion (3)'),
		level: 34,
		xp: 80,
		inputItems: new Bank().add('Toadflax potion (unf)').add("Toad's legs"),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Combat potion (3)',
		aliases: ['combat potion (3)', 'combat potion', 'combat'],
		id: itemID('Combat potion (3)'),
		level: 36,
		xp: 84,
		inputItems: new Bank().add('Harralander potion (unf)', 1).add('goat horn dust', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Prayer potion (3)',
		aliases: ['prayer potion', 'prayer', 'prayer potion (3)'],
		id: itemID('Prayer potion (3)'),
		level: 38,
		xp: 87.5,
		inputItems: new Bank().add('Ranarr potion (unf)').add('Snape grass'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Super attack (3)',
		aliases: ['super attack (3)', 'super attack'],
		id: itemID('Super attack (3)'),
		level: 45,
		xp: 100,
		inputItems: new Bank().add('Irit potion (unf)').add('Eye of newt'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Superantipoison (3)',
		aliases: ['superantipoison (3)', 'superantipoison'],
		id: itemID('Superantipoison (3)'),
		level: 48,
		xp: 106.5,
		inputItems: new Bank().add('Irit potion (unf)').add('Unicorn horn dust'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Fishing potion (3)',
		aliases: ['fishing potion (3)', 'fishing potion', 'fishing'],
		id: itemID('Fishing potion (3)'),
		level: 50,
		xp: 112.5,
		inputItems: new Bank().add('Avantoe potion (unf)').add('Snape grass'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Super energy (3)',
		aliases: ['super energy (3)', 'super energy'],
		id: itemID('Super energy (3)'),
		level: 52,
		xp: 117.5,
		inputItems: new Bank().add('Avantoe potion (unf)').add('Mort myre fungus'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Hunter potion (3)',
		aliases: ['hunter potion (3)', 'hunter potion', 'hunter'],
		id: itemID('Hunter potion (3)'),
		level: 53,
		xp: 120,
		inputItems: new Bank().add('Avantoe potion (unf)').add('Kebbit teeth dust'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Super strength (3)',
		aliases: ['super strength (3)', 'super strength'],
		id: itemID('Super strength (3)'),
		level: 55,
		xp: 125,
		inputItems: new Bank().add('Kwuarm potion (unf)').add('Limpwurt root'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Weapon poison',
		aliases: ['weapon poison'],
		id: itemID('Weapon poison'),
		level: 60,
		xp: 137.5,
		inputItems: new Bank().add('Kwuarm potion (unf)').add('Dragon scale dust'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Super restore (3)',
		aliases: ['super restore (3)', 'super restore'],
		id: itemID('Super restore (3)'),
		level: 63,
		xp: 142.5,
		inputItems: new Bank().add('Snapdragon potion (unf)', 1).add("Red spiders' eggs", 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Super defence (3)',
		aliases: ['super defence (3)', 'super defence'],
		id: itemID('Super defence (3)'),
		level: 66,
		xp: 150,
		inputItems: new Bank().add('Cadantine potion (unf)').add('White berries'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Antidote+ (4)',
		aliases: ['antidote+ (4)', 'antidote+'],
		id: itemID('Antidote+ (4)'),
		level: 68,
		xp: 155,
		inputItems: new Bank().add('Coconut milk').add('Toadflax').add('Yew roots'),
		tickRate: 2,
		bankTimePerPotion: 0.45
	},
	{
		name: 'Antifire potion (3)',
		aliases: ['antifire potion (3)', 'antifire potion', 'antifire'],
		id: itemID('Antifire potion (3)'),
		level: 69,
		xp: 157.5,
		inputItems: new Bank().add('Lantadyme potion (unf)', 1).add('Dragon scale dust', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Ranging potion (3)',
		aliases: ['ranging potion (3)', 'ranging potion', 'ranging'],
		id: itemID('Ranging potion (3)'),
		level: 72,
		xp: 162.5,
		inputItems: new Bank().add('Dwarf weed potion (unf)', 1).add('Wine of zamorak', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Weapon poison(+)',
		aliases: ['weapon poison(+)'],
		id: itemID('Weapon poison(+)'),
		level: 73,
		xp: 165,
		inputItems: new Bank().add('Coconut milk', 1).add('Cactus spine', 1).add("Red spiders' eggs", 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Magic potion (3)',
		aliases: ['magic potion (3)', 'magic potion', 'magic'],
		id: itemID('Magic potion (3)'),
		level: 76,
		xp: 172.5,
		inputItems: new Bank().add('Lantadyme potion (unf)').add('Potato cactus'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Stamina potion (4)',
		aliases: ['stamina potion (4)', 'stamina potion', 'stamina'],
		id: itemID('Stamina potion (4)'),
		level: 77,
		xp: 102,
		inputItems: new Bank().add('Super energy (4)').add('Amylase crystal', 4),
		tickRate: 2,
		bankTimePerPotion: 0.17
	},
	{
		name: 'Zamorak brew (3)',
		aliases: ['zamorak brew (3)', 'zamorak brew'],
		id: itemID('Zamorak brew (3)'),
		level: 78,
		xp: 175,
		inputItems: new Bank().add('Torstol potion (unf)').add('Jangerberries'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Antidote++ (4)',
		aliases: ['antidote++ (4)', 'antidote++'],
		id: itemID('Antidote++ (4)'),
		level: 79,
		xp: 177.5,
		inputItems: new Bank().add('Coconut milk', 1).add('Irit leaf', 1).add('Magic roots', 1),
		tickRate: 2,
		bankTimePerPotion: 0.45
	},
	{
		name: 'Cadantine blood potion (unf)',
		aliases: ['cadantine blood potion (unf)', 'cadantine blood potion', 'cadantine blood'],
		id: itemID('Cadantine blood potion (unf)'),
		level: 80,
		xp: 0,
		inputItems: new Bank().add('Vial of blood', 1).add('Cadantine', 1),
		tickRate: 1,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Bastion potion (3)',
		aliases: ['bastion potion (3)', 'bastion potion', 'bastion'],
		id: itemID('Bastion potion (3)'),
		level: 80,
		xp: 155,
		inputItems: new Bank().add('Cadantine blood potion (unf)', 1).add('Wine of zamorak', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Battlemage potion (3)',
		aliases: ['battlemage potion (3)', 'battlemage potion', 'battlemage'],
		id: itemID('Battlemage potion (3)'),
		level: 80,
		xp: 155,
		inputItems: new Bank().add('Cadantine blood potion (unf)', 1).add('Potato cactus', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Saradomin brew (3)',
		aliases: ['saradomin brew (3)', 'saradomin brew', 'sara brew'],
		id: itemID('Saradomin brew (3)'),
		level: 81,
		xp: 180,
		inputItems: new Bank().add('Toadflax potion (unf)', 1).add('Crushed nest', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Weapon poison(++)',
		aliases: ['weapon poison(++)'],
		id: itemID('Weapon poison(++)'),
		level: 82,
		xp: 165,
		inputItems: new Bank().add('Coconut milk', 1).add('Cave nightshade', 1).add('Poison ivy berries', 1),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Extended antifire (4)',
		aliases: ['extended antifire (4)', 'extended antifire'],
		id: itemID('Extended antifire (4)'),
		level: 84,
		xp: 110,
		inputItems: new Bank().add('Antifire potion(4)').add('Lava scale shard', 4),
		tickRate: 2,
		bankTimePerPotion: 0.17
	},
	{
		name: 'Ancient brew (3)',
		aliases: ['ancient brew (3)', 'ancient brew'],
		id: itemID('Ancient brew (3)'),
		level: 85,
		xp: 190,
		inputItems: new Bank().add('Dwarf weed potion (unf)').add('Nihil dust'),
		tickRate: 2,
		bankTimePerPotion: 0.17
	},
	{
		name: 'Anti-venom (4)',
		aliases: ['anti-venom (4)', 'anti-venom'],
		id: itemID('Anti-venom (4)'),
		level: 87,
		xp: 120,
		inputItems: new Bank().add('Antidote++ (4)').add("Zulrah's scales", 20),
		tickRate: 2,
		bankTimePerPotion: 0.17
	},
	{
		name: 'Super combat potion (4)',
		aliases: ['super combat potion (4)', 'super combat potion', 'super combat'],
		id: itemID('Super combat potion (4)'),
		level: 90,
		xp: 150,
		inputItems: new Bank()
			.add('Super attack(4)', 1)
			.add('Super strength (4)', 1)
			.add('Super defence (4)', 1)
			.add('Torstol', 1),
		tickRate: 2,
		bankTimePerPotion: 0.5
	},
	{
		name: 'Super antifire potion (4)',
		aliases: ['super antifire potion (4)', 'super antifire potion', 'super antifire'],
		id: itemID('Super antifire potion (4)'),
		level: 92,
		xp: 130,
		inputItems: new Bank().add('Antifire potion(4)', 1).add('Crushed superior dragon bones', 1),
		tickRate: 2,
		qpRequired: 205,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Anti-venom+(4)',
		aliases: ['Anti-venom+(4)', 'Anti-venom+'],
		id: itemID('Anti-venom+(4)'),
		level: 94,
		xp: 125,
		inputItems: new Bank().add('Anti-venom (4)').add('Torstol'),
		tickRate: 2,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Extended super antifire (4)',
		aliases: ['Extended super antifire (4)', 'Extended super antifire'],
		id: itemID('Extended super antifire (4)'),
		level: 98,
		xp: 160,
		inputItems: new Bank().add('Super antifire potion(4)', 1).add('Lava scale shard', 4),
		tickRate: 2,
		qpRequired: 205,
		bankTimePerPotion: 0.3
	},
	{
		name: 'Sanfew serum(4)',
		aliases: ['sanfew', 'sanfew serum', 'sanfew serum(4)'],
		id: itemID('Sanfew serum(4)'),
		level: 65,
		xp: 192,
		inputItems: new Bank()
			.add('Super restore(4)', 1)
			.add('Unicorn horn dust', 1)
			.add('Snake weed', 1)
			.add('Nail beast nails', 1),
		tickRate: 10,
		bankTimePerPotion: 0.5
	}
];

export default Potions;
