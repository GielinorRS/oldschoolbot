import { Bank } from 'oldschooljs';

import itemID from '../../util/itemID';
import { Createable } from '../createables';

export const dragonFireShieldCreatables: Createable[] = [
	// Uncharged
	{
		name: 'Uncharged dragonfire shield',
		inputItems: {
			[itemID('Draconic visage')]: 1,
			[itemID('Anti-dragon shield')]: 1
		},
		outputItems: {
			'Uncharged dragonfire shield': 1
		},
		requiredSkills: { smithing: 90 }
	},
	{
		name: 'Uncharged dragonfire ward',
		inputItems: {
			[itemID('Skeletal visage')]: 1,
			[itemID('Anti-dragon shield')]: 1
		},
		outputItems: {
			'Uncharged dragonfire ward': 1
		},
		requiredSkills: { smithing: 90 }
	},
	{
		name: 'Uncharged ancient wyvern shield',
		inputItems: {
			[itemID('Wyvern visage')]: 1,
			[itemID('Elemental shield')]: 1
		},
		outputItems: {
			'Uncharged ancient wyvern shield': 1
		},
		requiredSkills: { smithing: 66, magic: 66 }
	},
	// Charged
	{
		name: 'Dragonfire shield',
		inputItems: new Bank().add('Bottled dragonbreath', 1).add('Uncharged dragonfire shield', 1).bank,
		outputItems: new Bank().add('Dragonfire shield', 1)
	},
	{
		name: 'Dragonfire ward',
		inputItems: new Bank().add('Bottled dragonbreath', 1).add('Uncharged dragonfire ward', 1).bank,
		outputItems: new Bank().add('Dragonfire ward', 1)
	},
	{
		name: 'Ancient wyvern shield',
		inputItems: new Bank()
			.add('Bottled dragonbreath', 1)
			.add('Numulite', 5000)
			.add('Uncharged ancient wyvern shield', 1).bank,
		outputItems: new Bank().add('Ancient wyvern shield', 1)
	}
];
