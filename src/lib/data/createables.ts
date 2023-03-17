import { Bank } from 'oldschooljs';

import { BitField } from '../constants';
import { Favours } from '../minions/data/kourendFavour';
import { blisterwoodRequirements, ivandisRequirements } from '../minions/data/templeTrekking';
import { SlayerTaskUnlocksEnum } from '../slayer/slayerUnlocks';
import { ItemBank, Skills } from '../types';
import getOSItem from '../util/getOSItem';
import itemID from '../util/itemID';
import { itemNameFromID } from '../util/smallUtils';
import { chambersOfXericMetamorphPets } from './CollectionsExport';
import { amrodCreatables } from './creatables/amrod';
import { armorAndItemPacks } from './creatables/armorPacks';
import { capeCreatables } from './creatables/capes';
import { dragonFireShieldCreatables } from './creatables/dragonfireShields';
import { gracefulOutfitCreatables } from './creatables/gracefulOutfits';
import { guardiansOfTheRiftCreatables } from './creatables/guardiansOfTheRiftCreatables';
import { leaguesCreatables } from './creatables/leagueCreatables';
import { lmsCreatables } from './creatables/lms';
import { mysticStavesCreatables } from './creatables/mysticStaves';
import { nexCreatables } from './creatables/nex';
import { ornamentKits } from './creatables/ornaments';
import { shadesOfMortonCreatables } from './creatables/shadesOfMorton';
import { slayerCreatables } from './creatables/slayer';
import { toaCreatables } from './creatables/toa';
import { tobCreatables } from './creatables/tob';

export interface Createable {
	name: string;
	outputItems: Bank;
	inputItems: Bank;
	cantHaveItems?: Bank;
	requiredSkills?: Skills;
	QPRequired?: number;
	noCl?: boolean;
	forceAddToCl?: boolean;
	GPCost?: number;
	cantBeInCL?: boolean;
	requiredSlayerUnlocks?: SlayerTaskUnlocksEnum[];
	requiredFavour?: Favours;
	maxCanOwn?: number;
	onCreate?: (qty: number, user: MUser) => Promise<{ result: boolean; message: string }>;
	type?: 'pack' | 'unpack';
	customReq?: (user: MUser) => Promise<string | null>;
}

const bloodBarkPairs = [
	['Bloodbark helm', 'Splitbark helm', 250, 79],
	['Bloodbark body', 'Splitbark body', 500, 81],
	['Bloodbark legs', 'Splitbark legs', 500, 81],
	['Bloodbark boots', 'Splitbark boots', 100, 77],
	['Bloodbark gauntlets', 'Splitbark gauntlets', 100, 77]
] as const;

const bloodBarkCreatables: Createable[] = [];

for (const [bbPart, sbPart, bloodRunes, lvlReq] of bloodBarkPairs) {
	const bbItem = getOSItem(bbPart);
	const sbItem = getOSItem(sbPart);

	bloodBarkCreatables.push({
		name: bbItem.name,
		inputItems: new Bank().add(sbItem.id).add('Blood rune', bloodRunes),
		outputItems: new Bank().add(bbItem.id),
		requiredSkills: {
			runecraft: lvlReq
		},
		customReq: async (user: MUser) => {
			if (!user.bitfield.includes(BitField.HasBloodbarkScroll)) {
				return 'You need to have used a Runescroll of bloodbark to create this item!';
			}

			return null;
		}
	});
}

const goldenProspectorCreatables: Createable[] = [
	{
		name: 'Golden prospector boots',
		inputItems: new Bank().add('Prospector boots', 1).add('Star fragment', 1),
		outputItems: new Bank().add('Golden prospector boots', 1)
	},
	{
		name: 'Golden prospector helmet',
		inputItems: new Bank().add('Prospector helmet', 1).add('Star fragment', 1),
		outputItems: new Bank().add('Golden prospector helmet', 1)
	},
	{
		name: 'Golden prospector jacket',
		inputItems: new Bank().add('Prospector jacket', 1).add('Star fragment', 1),
		outputItems: new Bank().add('Golden prospector jacket', 1)
	},
	{
		name: 'Golden prospector legs',
		inputItems: new Bank().add('Prospector legs', 1).add('Star fragment', 1),
		outputItems: new Bank().add('Golden prospector legs', 1)
	}
];

const revWeapons: Createable[] = [
	{
		name: 'Bracelet of ethereum',
		inputItems: new Bank().add('Bracelet of ethereum (uncharged)', 1).add('Revenant ether', 2000),
		outputItems: new Bank().add('Bracelet of ethereum', 1)
	},
	{
		name: 'Revenant ether',
		inputItems: new Bank().add('Bracelet of ethereum (uncharged)', 1),
		outputItems: new Bank().add('Revenant ether', 250),
		noCl: true
	}
];

for (const [uWep, cWep] of [
	["Viggora's chainmace (u)", "Viggora's chainmace"],
	["Craw's bow (u)", "Craw's bow"],
	["Thammaron's sceptre (u)", "Thammaron's sceptre"]
]) {
	revWeapons.push({
		name: cWep,
		inputItems: {
			[itemID('Revenant ether')]: 7000,
			[itemID(uWep)]: 1
		},
		outputItems: {
			[itemID(cWep)]: 1
		}
	});
	revWeapons.push({
		name: `Revert ${cWep.toLowerCase()}`,
		inputItems: {
			[itemID(cWep)]: 1
		},
		outputItems: {
			[itemID('Revenant ether')]: 7000,
			[itemID(uWep)]: 1
		}
	});
	revWeapons.push({
		name: `Revert ${uWep.toLowerCase()}`,
		inputItems: {
			[itemID(uWep)]: 1
		},
		outputItems: {
			[itemID('Revenant ether')]: 7500
		}
	});
}

const metamorphPetCreatables: Createable[] = chambersOfXericMetamorphPets.map(pet => ({
	name: itemNameFromID(pet)!,
	inputItems: {
		[itemID('Metamorphic dust')]: 1
	},
	outputItems: {
		[pet]: 1
	}
}));

const twistedAncestral: Createable[] = [
	{
		name: 'Twisted ancestral hat',
		inputItems: {
			[itemID('Ancestral hat')]: 1,
			[itemID('Twisted ancestral colour kit')]: 1
		},
		outputItems: {
			[itemID('Twisted ancestral hat')]: 1
		}
	},
	{
		name: 'Twisted ancestral robe top',
		inputItems: {
			[itemID('Ancestral robe top')]: 1,
			[itemID('Twisted ancestral colour kit')]: 1
		},
		outputItems: {
			[itemID('Twisted ancestral robe top')]: 1
		}
	},
	{
		name: 'Twisted ancestral robe bottom',
		inputItems: {
			[itemID('Ancestral robe bottom')]: 1,
			[itemID('Twisted ancestral colour kit')]: 1
		},
		outputItems: {
			[itemID('Twisted ancestral robe bottom')]: 1
		}
	},
	{
		name: 'Revert twisted ancestral robe bottom',
		inputItems: {
			[itemID('Twisted ancestral robe bottom')]: 1
		},
		outputItems: {
			[itemID('Ancestral robe bottom')]: 1,
			[itemID('Twisted ancestral colour kit')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert twisted ancestral robe top',
		inputItems: {
			[itemID('Twisted ancestral robe top')]: 1
		},
		outputItems: {
			[itemID('Ancestral robe top')]: 1,
			[itemID('Twisted ancestral colour kit')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert twisted ancestral hat',
		inputItems: {
			[itemID('Twisted ancestral hat')]: 1
		},
		outputItems: {
			[itemID('Ancestral hat')]: 1,
			[itemID('Twisted ancestral colour kit')]: 1
		},
		noCl: true
	}
];

const crystalTools: Createable[] = [
	{
		name: 'Crystal pickaxe',
		inputItems: {
			[itemID('Dragon pickaxe')]: 1,
			[itemID('Crystal tool seed')]: 1,
			[itemID('Crystal shard')]: 120
		},
		outputItems: {
			[itemID('Crystal pickaxe')]: 1
		},
		requiredSkills: { smithing: 76, crafting: 76 },
		QPRequired: 150
	},
	{
		name: 'Crystal harpoon',
		inputItems: {
			[itemID('Dragon harpoon')]: 1,
			[itemID('Crystal tool seed')]: 1,
			[itemID('Crystal shard')]: 120
		},
		outputItems: {
			[itemID('Crystal harpoon')]: 1
		},
		requiredSkills: { smithing: 76, crafting: 76 },
		QPRequired: 150
	},
	{
		name: 'Crystal axe',
		inputItems: {
			[itemID('Dragon axe')]: 1,
			[itemID('Crystal tool seed')]: 1,
			[itemID('Crystal shard')]: 120
		},
		outputItems: {
			[itemID('Crystal axe')]: 1
		},
		requiredSkills: { smithing: 76, crafting: 76 },
		QPRequired: 150
	},
	{
		name: 'Enhanced crystal key',
		inputItems: {
			[itemID('Crystal key')]: 1,
			[itemID('Crystal shard')]: 10
		},
		outputItems: {
			[itemID('Enhanced crystal key')]: 1
		},
		requiredSkills: { smithing: 80, crafting: 80 },
		QPRequired: 150
	},
	{
		name: 'Blade of saeldor (c)',
		inputItems: {
			[itemID('Blade of saeldor (inactive)')]: 1,
			[itemID('Crystal shard')]: 1000
		},
		outputItems: {
			[itemID('Blade of saeldor (c)')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150
	},
	{
		name: 'Revert blade of saeldor (c)',
		inputItems: {
			[itemID('Blade of saeldor (c)')]: 1
		},
		outputItems: {
			[itemID('Blade of saeldor (inactive)')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150,
		noCl: true
	},
	{
		name: 'Bow of faerdhinen (c)',
		inputItems: {
			[itemID('Bow of faerdhinen (inactive)')]: 1,
			[itemID('Crystal shard')]: 2000
		},
		outputItems: {
			[itemID('Bow of faerdhinen (c)')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150
	},
	{
		name: 'Revert bow of faerdhinen (c)',
		inputItems: {
			[itemID('Bow of faerdhinen (c)')]: 1
		},
		outputItems: {
			[itemID('Bow of faerdhinen (inactive)')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150,
		noCl: true
	},
	{
		name: 'Blade of saeldor (inactive)',
		inputItems: {
			[itemID('Enhanced crystal weapon seed')]: 1,
			[itemID('Crystal shard')]: 100
		},
		outputItems: {
			[itemID('Blade of saeldor (inactive)')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150
	},
	{
		name: 'Revert blade of saeldor (inactive)',
		inputItems: {
			[itemID('Blade of saeldor (inactive)')]: 1,
			[itemID('Crystal shard')]: 250
		},
		outputItems: {
			[itemID('Enhanced crystal weapon seed')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150
	},
	{
		name: 'Bow of faerdhinen (inactive)',
		inputItems: {
			[itemID('Enhanced crystal weapon seed')]: 1,
			[itemID('Crystal shard')]: 100
		},
		outputItems: {
			[itemID('Bow of faerdhinen (inactive)')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150
	},
	{
		name: 'Revert bow of faerdhinen (inactive)',
		inputItems: {
			[itemID('Bow of faerdhinen (inactive)')]: 1,
			[itemID('Crystal shard')]: 250
		},
		outputItems: {
			[itemID('Enhanced crystal weapon seed')]: 1
		},
		requiredSkills: { smithing: 82, crafting: 82 },
		QPRequired: 150
	},
	{
		name: 'Crystal halberd',
		inputItems: new Bank().add('Crystal weapon seed', 1).add('Crystal shard', 40),
		outputItems: {
			[itemID('Crystal halberd')]: 1
		},
		requiredSkills: { smithing: 78, crafting: 78 },
		QPRequired: 150,
		noCl: true
	},
	{
		name: 'Crystal bow',
		inputItems: new Bank().add('Crystal weapon seed', 1).add('Crystal shard', 40),
		outputItems: {
			[itemID('Crystal bow')]: 1
		},
		requiredSkills: { smithing: 78, crafting: 78 },
		QPRequired: 150,
		noCl: true
	},
	{
		name: 'Crystal helm',
		inputItems: new Bank().add('Crystal armour seed', 1).add('Crystal shard', 150),
		outputItems: {
			[itemID('Crystal helm')]: 1
		},
		requiredSkills: { smithing: 70, crafting: 70 },
		QPRequired: 150,
		noCl: true
	},
	{
		name: 'Crystal legs',
		inputItems: new Bank().add('Crystal armour seed', 2).add('Crystal shard', 300),
		outputItems: {
			[itemID('Crystal legs')]: 1
		},
		requiredSkills: { smithing: 72, crafting: 72 },
		QPRequired: 150,
		noCl: true
	},
	{
		name: 'Crystal body',
		inputItems: new Bank().add('Crystal armour seed', 3).add('Crystal shard', 450),
		outputItems: {
			[itemID('Crystal body')]: 1
		},
		requiredSkills: { smithing: 74, crafting: 74 },
		QPRequired: 150,
		noCl: true
	}
];

const hunterClothing: Createable[] = [
	{
		name: 'Polar camouflage gear',
		inputItems: new Bank().add('Polar kebbit fur', 4),
		outputItems: new Bank().add('Polar camo top').add('Polar camo legs'),
		GPCost: 40
	},
	{
		name: 'Woodland camouflage gear',
		inputItems: new Bank().add('Common kebbit fur', 4),
		outputItems: new Bank().add('Wood camo top').add('Wood camo legs'),
		GPCost: 40
	},
	{
		name: 'Jungle camouflage gear',
		inputItems: new Bank().add('Feldip weasel fur', 4),
		outputItems: new Bank().add('Jungle camo top').add('Jungle camo legs'),
		GPCost: 40
	},
	{
		name: 'Desert camouflage gear',
		inputItems: new Bank().add('Desert devil fur', 4),
		outputItems: new Bank().add('Desert camo top').add('Desert camo legs'),
		GPCost: 40
	},
	{
		name: 'Larupia hunter gear',
		inputItems: new Bank().add('Larupia fur').add('Tatty larupia fur', 2),
		outputItems: new Bank().add('Larupia hat').add('Larupia top').add('Larupia legs'),
		GPCost: 700
	},
	{
		name: 'Graahk hunter gear',
		inputItems: new Bank().add('Graahk fur').add('Tatty graahk fur', 2),
		outputItems: new Bank().add('Graahk headdress').add('Graahk top').add('Graahk legs'),
		GPCost: 1000
	},
	{
		name: 'Kyatt hunter gear',
		inputItems: new Bank().add('Kyatt fur').add('Tatty kyatt fur', 2),
		outputItems: new Bank().add('Kyatt hat').add('Kyatt top').add('Kyatt legs'),
		GPCost: 1400
	},
	{
		name: 'Spotted cape',
		inputItems: new Bank().add('Spotted kebbit fur', 2),
		outputItems: new Bank().add('Spotted cape'),
		GPCost: 400
	},
	{
		name: 'Spottier cape',
		inputItems: new Bank().add('Dashing kebbit fur', 2),
		outputItems: new Bank().add('Spottier cape'),
		GPCost: 800
	},
	{
		name: 'Gloves of silence',
		inputItems: new Bank().add('Dark kebbit fur', 2),
		outputItems: new Bank().add('Gloves of silence'),
		GPCost: 600
	}
];

const metamorphPets: Createable[] = [
	{
		name: 'Midnight',
		inputItems: {
			[itemID('Noon')]: 1
		},
		outputItems: {
			[itemID('Midnight')]: 1
		}
	},
	{
		name: 'Baby mole-rat',
		inputItems: {
			[itemID('Baby mole')]: 1,
			[itemID('Mole claw')]: 1
		},
		outputItems: {
			[itemID('Baby mole-rat')]: 1
		}
	},
	{
		name: 'Tzrek-zuk',
		inputItems: {
			[itemID('Jal-nib-rek')]: 1
		},
		outputItems: {
			[itemID('Tzrek-zuk')]: 1
		}
	},
	{
		name: 'Little parasite',
		inputItems: {
			[itemID('Parasitic egg')]: 1,
			[itemID('Little nightmare')]: 1
		},
		outputItems: {
			[itemID('Little parasite')]: 1
		}
	},
	{
		name: 'Ziggy',
		inputItems: {
			[itemID('Rocky')]: 1,
			[itemID('Poison ivy berries')]: 1
		},
		outputItems: {
			[itemID('Ziggy')]: 1
		}
	},
	{
		name: 'Red',
		inputItems: {
			[itemID('Rocky')]: 1,
			[itemID('Redberries')]: 1
		},
		outputItems: {
			[itemID('Red')]: 1
		}
	},
	{
		name: 'Great blue heron',
		inputItems: {
			[itemID('Heron')]: 1,
			[itemID('Spirit flakes')]: 3000
		},
		outputItems: {
			[itemID('Great blue heron')]: 1
		}
	},
	{
		name: 'Greatish guardian',
		inputItems: {
			[itemID('Rift guardian')]: 1,
			[itemID("Guardian's eye")]: 1
		},
		outputItems: {
			[itemID('Greatish guardian')]: 1
		}
	}
];

const Reverteables: Createable[] = [
	{
		name: 'Revert tanzanite fang',
		inputItems: {
			[itemID('Tanzanite fang')]: 1
		},
		outputItems: {
			[itemID("Zulrah's scales")]: 20_000
		},
		noCl: true
	},
	{
		name: 'Revert toxic blowpipe (empty)',
		inputItems: {
			[itemID('Toxic blowpipe (empty)')]: 1
		},
		outputItems: {
			[itemID("Zulrah's scales")]: 20_000
		},
		noCl: true
	},
	{
		name: 'Revert magic fang',
		inputItems: {
			[itemID('Magic fang')]: 1
		},
		outputItems: {
			[itemID("Zulrah's scales")]: 20_000
		},
		noCl: true
	},
	{
		name: 'Revert serpentine visage',
		inputItems: {
			[itemID('Serpentine visage')]: 1
		},
		outputItems: {
			[itemID("Zulrah's scales")]: 20_000
		},
		noCl: true
	},
	{
		name: 'Revert serpentine helm (uncharged)',
		inputItems: {
			[itemID('Serpentine helm (uncharged)')]: 1
		},
		outputItems: {
			[itemID("Zulrah's scales")]: 20_000
		},
		noCl: true
	},
	{
		name: 'Revert volatile nightmare staff',
		outputItems: new Bank().add('Nightmare staff', 1).add('Volatile orb', 1),
		inputItems: new Bank().add('Volatile nightmare staff', 1),
		noCl: true
	},
	{
		name: 'Revert harmonised nightmare staff',
		outputItems: new Bank().add('Nightmare staff', 1).add('Harmonised orb', 1),
		inputItems: new Bank().add('Harmonised nightmare staff', 1),
		noCl: true
	},
	{
		name: 'Revert eldritch nightmare staff',
		outputItems: new Bank().add('Nightmare staff', 1).add('Eldritch orb', 1),
		inputItems: new Bank().add('Eldritch nightmare staff', 1),
		noCl: true
	},
	{
		name: 'Revert red decorative full helm',
		inputItems: {
			[itemID('Red decorative full helm')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 5
		},
		noCl: true
	},
	{
		name: 'Revert red decorative helm',
		inputItems: {
			[itemID('Red decorative helm')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 4
		},
		noCl: true
	},
	{
		name: 'Revert red decorative body',
		inputItems: {
			[itemID('Red decorative body')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 8
		},
		noCl: true
	},
	{
		name: 'Revert red decorative legs',
		inputItems: {
			[itemID('Red decorative legs')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 6
		},
		noCl: true
	},
	{
		name: 'Revert red decorative skirt',
		inputItems: {
			[itemID('Red decorative skirt')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 6
		},
		noCl: true
	},
	{
		name: 'Revert red decorative boots',
		inputItems: {
			[itemID('Red decorative boots')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 4
		},
		noCl: true
	},
	{
		name: 'Revert red decorative shield',
		inputItems: {
			[itemID('Red decorative shield')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 6
		},
		noCl: true
	},
	{
		name: 'Revert red decorative sword',
		inputItems: {
			[itemID('Red decorative sword')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 5
		},
		noCl: true
	},
	{
		name: 'Revert white decorative full helm',
		inputItems: {
			[itemID('White decorative full helm')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 50
		},
		noCl: true
	},
	{
		name: 'Revert white decorative helm',
		inputItems: {
			[itemID('White decorative helm')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 40
		},
		noCl: true
	},
	{
		name: 'Revert white decorative body',
		inputItems: {
			[itemID('White decorative body')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 80
		},
		noCl: true
	},
	{
		name: 'Revert white decorative legs',
		inputItems: {
			[itemID('White decorative legs')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 60
		},
		noCl: true
	},
	{
		name: 'Revert white decorative skirt',
		inputItems: {
			[itemID('White decorative skirt')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 60
		},
		noCl: true
	},
	{
		name: 'Revert white decorative boots',
		inputItems: {
			[itemID('White decorative boots')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 40
		},
		noCl: true
	},
	{
		name: 'Revert white decorative shield',
		inputItems: {
			[itemID('White decorative shield')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 60
		},
		noCl: true
	},
	{
		name: 'Revert white decorative sword',
		inputItems: {
			[itemID('White decorative sword')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 50
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative full helm',
		inputItems: {
			[itemID('Gold decorative full helm')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 500
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative helm',
		inputItems: {
			[itemID('Gold decorative helm')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 400
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative body',
		inputItems: {
			[itemID('Gold decorative body')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 800
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative legs',
		inputItems: {
			[itemID('Gold decorative legs')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 600
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative skirt',
		inputItems: {
			[itemID('Gold decorative skirt')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 600
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative boots',
		inputItems: {
			[itemID('Gold decorative boots')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 400
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative shield',
		inputItems: {
			[itemID('Gold decorative shield')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 600
		},
		noCl: true
	},
	{
		name: 'Revert gold decorative sword',
		inputItems: {
			[itemID('Gold decorative sword')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 500
		},
		noCl: true
	},
	{
		name: 'Revert zamorak castlewars hood',
		inputItems: {
			[itemID('Zamorak castlewars hood')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 10
		},
		noCl: true
	},
	{
		name: 'Revert zamorak castlewars cloak',
		inputItems: {
			[itemID('Zamorak castlewars cloak')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 10
		},
		noCl: true
	},
	{
		name: 'Revert saradomin castlewars hood',
		inputItems: {
			[itemID('Saradomin castlewars hood')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 10
		},
		noCl: true
	},
	{
		name: 'Revert saradomin castlewars cloak',
		inputItems: {
			[itemID('Saradomin castlewars cloak')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 10
		},
		noCl: true
	},
	{
		name: 'Revert saradomin banner',
		inputItems: {
			[itemID('Saradomin banner')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 100
		},
		noCl: true
	},
	{
		name: 'Revert zamorak banner',
		inputItems: {
			[itemID('Zamorak banner')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 100
		},
		noCl: true
	},
	{
		name: 'Revert decorative magic hat',
		inputItems: {
			[itemID('Decorative magic hat')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 20
		},
		noCl: true
	},
	{
		name: 'Revert decorative magic top',
		inputItems: {
			[itemID('Decorative magic top')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 40
		},
		noCl: true
	},
	{
		name: 'Revert decorative magic robe',
		inputItems: {
			[itemID('Decorative magic robe')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 30
		},
		noCl: true
	},
	{
		name: 'Revert decorative ranged top',
		inputItems: {
			[itemID('Decorative ranged top')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 40
		},
		noCl: true
	},
	{
		name: 'Revert decorative ranged legs',
		inputItems: {
			[itemID('Decorative ranged legs')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 30
		},
		noCl: true
	},
	{
		name: 'Revert decorative quiver',
		inputItems: {
			[itemID('Decorative quiver')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 40
		},
		noCl: true
	},
	{
		name: 'Revert saradomin halo',
		inputItems: {
			[itemID('Saradomin halo')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 75
		},
		noCl: true
	},
	{
		name: 'Revert zamorak halo',
		inputItems: {
			[itemID('Zamorak halo')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 75
		},
		noCl: true
	},
	{
		name: 'Revert guthix halo',
		inputItems: {
			[itemID('Guthix halo')]: 1
		},
		outputItems: {
			[itemID('Castle wars ticket')]: 75
		},
		noCl: true
	},
	{
		name: 'Revert partyhat & specs',
		inputItems: {
			[itemID('Partyhat & specs')]: 1
		},
		outputItems: {
			[itemID('Blue partyhat')]: 1,
			[itemID('Sagacious spectacles')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert zamorakian hasta',
		inputItems: new Bank().add('Zamorakian hasta', 1),
		outputItems: new Bank().add('Zamorakian spear', 1),
		noCl: true
	},
	{
		name: 'Revert armadyl godsword',
		inputItems: {
			[itemID('Armadyl godsword')]: 1
		},
		outputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Armadyl hilt')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert bandos godsword',
		inputItems: {
			[itemID('Bandos godsword')]: 1
		},
		outputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Bandos hilt')]: 1
		}
	},
	{
		name: 'Revert saradomin godsword',
		inputItems: {
			[itemID('Saradomin godsword')]: 1
		},
		outputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Saradomin hilt')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert zamorak godsword',
		inputItems: {
			[itemID('Zamorak godsword')]: 1
		},
		outputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Zamorak hilt')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert Fish sack barrel',
		inputItems: new Bank().add('Fish sack barrel'),
		outputItems: {
			[itemID('Fish sack')]: 1,
			[itemID('Fish barrel')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert midnight',
		inputItems: {
			[itemID('Midnight')]: 1
		},
		outputItems: {
			[itemID('Noon')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert baby mole-rat',
		inputItems: {
			[itemID('Baby mole-rat')]: 1,
			[itemID('Mole skin')]: 1
		},
		outputItems: {
			[itemID('Baby mole')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert tzrek-zuk',
		inputItems: {
			[itemID('Tzrek-zuk')]: 1
		},
		outputItems: {
			[itemID('Jal-nib-rek')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert little parasite',
		inputItems: {
			[itemID('Little parasite')]: 1
		},
		outputItems: {
			[itemID('Little nightmare')]: 1,
			[itemID('Parasitic egg')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert ziggy',
		inputItems: {
			[itemID('Ziggy')]: 1,
			[itemID('White berries')]: 1
		},
		outputItems: {
			[itemID('Rocky')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert red',
		inputItems: {
			[itemID('Red')]: 1,
			[itemID('White berries')]: 1
		},
		outputItems: {
			[itemID('Rocky')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert great blue heron',
		inputItems: {
			[itemID('Great blue heron')]: 1
		},
		outputItems: {
			[itemID('Heron')]: 1
		},
		noCl: true
	},
	{
		name: 'Revert greatish guardian',
		inputItems: {
			[itemID('Greatish guardian')]: 1
		},
		outputItems: {
			[itemID('Rift guardian')]: 1,
			[itemID("Guardian's eye")]: 1
		},
		noCl: true
	}
];

const Createables: Createable[] = [
	{
		name: 'Godsword blade',
		inputItems: {
			[itemID('Godsword shard 1')]: 1,
			[itemID('Godsword shard 2')]: 1,
			[itemID('Godsword shard 3')]: 1
		},
		outputItems: {
			[itemID('Godsword blade')]: 1
		},
		requiredSkills: { smithing: 80 }
	},
	{
		name: 'Armadyl godsword',
		inputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Armadyl hilt')]: 1
		},
		outputItems: {
			[itemID('Armadyl godsword')]: 1
		}
	},
	{
		name: 'Bandos godsword',
		inputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Bandos hilt')]: 1
		},
		outputItems: {
			[itemID('Bandos godsword')]: 1
		}
	},
	{
		name: 'Saradomin godsword',
		inputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Saradomin hilt')]: 1
		},
		outputItems: {
			[itemID('Saradomin godsword')]: 1
		}
	},
	{
		name: 'Zamorak godsword',
		inputItems: {
			[itemID('Godsword blade')]: 1,
			[itemID('Zamorak hilt')]: 1
		},
		outputItems: {
			[itemID('Zamorak godsword')]: 1
		}
	},
	{
		name: 'Infernal pickaxe',
		inputItems: {
			[itemID('Dragon pickaxe')]: 1,
			[itemID('Smouldering stone')]: 1
		},
		outputItems: {
			[itemID('Infernal pickaxe')]: 1
		},
		requiredSkills: { smithing: 85 }
	},
	{
		name: 'Malediction ward',
		inputItems: {
			[itemID('Malediction shard 1')]: 1,
			[itemID('Malediction shard 2')]: 1,
			[itemID('Malediction shard 3')]: 1
		},
		outputItems: {
			[itemID('Malediction ward')]: 1
		}
	},
	{
		name: 'Odium ward',
		inputItems: {
			[itemID('Odium shard 1')]: 1,
			[itemID('Odium shard 2')]: 1,
			[itemID('Odium shard 3')]: 1
		},
		outputItems: {
			[itemID('Odium ward')]: 1
		}
	},
	{
		name: 'Crystal key',
		inputItems: new Bank().add('Loop half of key', 1).add('Tooth half of key', 1),
		outputItems: new Bank().add('Crystal key')
	},
	{
		name: 'Master clue',
		inputItems: {
			[itemID('Clue scroll (easy)')]: 1,
			[itemID('Clue scroll (medium)')]: 1,
			[itemID('Clue scroll (hard)')]: 1,
			[itemID('Clue scroll (elite)')]: 1
		},
		outputItems: {
			[itemID('Clue scroll (master)')]: 1
		},
		cantHaveItems: {
			[itemID('Clue scroll (master)')]: 1
		}
	},
	{
		name: 'Infernal axe',
		inputItems: {
			[itemID('Dragon axe')]: 1,
			[itemID('Smouldering stone')]: 1
		},
		outputItems: {
			[itemID('Infernal axe')]: 1
		},
		requiredSkills: { firemaking: 85 }
	},
	{
		name: 'Infernal harpoon',
		inputItems: {
			[itemID('Dragon harpoon')]: 1,
			[itemID('Smouldering stone')]: 1
		},
		outputItems: {
			[itemID('Infernal harpoon')]: 1
		},
		requiredSkills: { cooking: 85, fishing: 75 }
	},
	{
		name: 'Hell cat ears',
		inputItems: {
			[itemID('Cat ears')]: 1,
			[itemID('Red dye')]: 1
		},
		outputItems: {
			[itemID('Hell cat ears')]: 1
		},
		cantHaveItems: {
			[itemID('Hell cat ears')]: 1
		}
	},
	// Runecrafting Pouches
	{
		name: 'Small pouch',
		inputItems: {},
		outputItems: {
			[itemID('Small pouch')]: 1
		},
		cantHaveItems: {
			[itemID('Small pouch')]: 1
		}
	},
	{
		name: 'Medium pouch',
		inputItems: {},
		outputItems: {
			[itemID('Medium pouch')]: 1
		},
		cantHaveItems: {
			[itemID('Medium pouch')]: 1
		}
	},
	{
		name: 'Large pouch',
		inputItems: {},
		outputItems: {
			[itemID('Large pouch')]: 1
		},
		cantHaveItems: {
			[itemID('Large pouch')]: 1
		}
	},
	{
		name: 'Giant pouch',
		inputItems: {},
		outputItems: {
			[itemID('Giant pouch')]: 1
		},
		cantHaveItems: {
			[itemID('Giant pouch')]: 1
		}
	},
	{
		name: 'Colossal pouch',
		inputItems: {
			[itemID('Abyssal needle')]: 1,
			[itemID('Small pouch')]: 1,
			[itemID('Medium pouch')]: 1,
			[itemID('Large pouch')]: 1,
			[itemID('Giant pouch')]: 1
		},
		outputItems: {
			[itemID('Colossal pouch')]: 1
		},
		cantHaveItems: {
			[itemID('Colossal pouch')]: 1
		},
		requiredSkills: { runecraft: 85, crafting: 56 }
	},
	// Spirit Shields
	{
		name: 'Blessed spirit shield',
		inputItems: {
			[itemID('Spirit shield')]: 1,
			[itemID('Holy elixir')]: 1
		},
		outputItems: {
			[itemID('Blessed spirit shield')]: 1
		},
		requiredSkills: { prayer: 85 }
	},
	{
		name: 'Spectral spirit shield',
		inputItems: {
			[itemID('Blessed spirit shield')]: 1,
			[itemID('Spectral sigil')]: 1
		},
		outputItems: {
			[itemID('Spectral spirit shield')]: 1
		},
		requiredSkills: { prayer: 90, smithing: 85 }
	},
	{
		name: 'Arcane spirit shield',
		inputItems: {
			[itemID('Blessed spirit shield')]: 1,
			[itemID('Arcane sigil')]: 1
		},
		outputItems: {
			[itemID('Arcane spirit shield')]: 1
		},
		requiredSkills: { prayer: 90, smithing: 85 }
	},
	{
		name: 'Elysian spirit shield',
		inputItems: {
			[itemID('Blessed spirit shield')]: 1,
			[itemID('Elysian sigil')]: 1
		},
		outputItems: {
			[itemID('Elysian spirit shield')]: 1
		},
		requiredSkills: { prayer: 90, smithing: 85 }
	},
	{
		name: 'Holy book',
		inputItems: new Bank()
			.add('Saradomin page 1', 1)
			.add('Saradomin page 2', 1)
			.add('Saradomin page 3', 1)
			.add('Saradomin page 4', 1),
		outputItems: new Bank().add('Holy book', 1),
		requiredSkills: { agility: 35 },
		QPRequired: 5
	},
	{
		name: 'Book of balance',
		inputItems: new Bank()
			.add('Guthix page 1', 1)
			.add('Guthix page 2', 1)
			.add('Guthix page 3', 1)
			.add('Guthix page 4', 1),
		outputItems: new Bank().add('Book of balance', 1),
		requiredSkills: { agility: 35 },
		QPRequired: 5
	},
	{
		name: 'Unholy book',
		inputItems: new Bank()
			.add('Zamorak page 1', 1)
			.add('Zamorak page 2', 1)
			.add('Zamorak page 3', 1)
			.add('Zamorak page 4', 1),
		outputItems: new Bank().add('Unholy book', 1),
		requiredSkills: { agility: 35 },
		QPRequired: 5
	},
	{
		name: 'Book of law',
		inputItems: new Bank()
			.add('Armadyl page 1', 1)
			.add('Armadyl page 2', 1)
			.add('Armadyl page 3', 1)
			.add('Armadyl page 4', 1),
		outputItems: new Bank().add('Book of law', 1),
		requiredSkills: { agility: 35 },
		QPRequired: 5
	},
	{
		name: 'Book of war',
		inputItems: new Bank()
			.add('Bandos page 1', 1)
			.add('Bandos page 2', 1)
			.add('Bandos page 3', 1)
			.add('Bandos page 4', 1),
		outputItems: new Bank().add('Book of war', 1),
		requiredSkills: { agility: 35 },
		QPRequired: 5
	},
	{
		name: 'Book of darkness',
		inputItems: new Bank()
			.add('Ancient page 1', 1)
			.add('Ancient page 2', 1)
			.add('Ancient page 3', 1)
			.add('Ancient page 4', 1),
		outputItems: new Bank().add('Book of darkness', 1),
		requiredSkills: { agility: 35 },
		QPRequired: 5
	},
	{
		name: "Ava's accumulator",
		inputItems: new Bank().add('Steel arrow', 75),
		outputItems: new Bank().add("Ava's accumulator", 1),
		QPRequired: 30
	},
	{
		name: "Ava's assembler",
		inputItems: new Bank().add('Mithril arrow', 75).add("Ava's accumulator", 1).add("Vorkath's head", 1),
		outputItems: new Bank().add("Ava's assembler", 1),
		QPRequired: 205
	},
	{
		name: 'Dragon sq shield',
		inputItems: new Bank().add('Shield right half', 1).add('Shield left half', 1),
		outputItems: new Bank().add('Dragon sq shield', 1),
		QPRequired: 111,
		requiredSkills: { smithing: 60 }
	},
	{
		name: 'Dragon kiteshield',
		inputItems: new Bank().add('Dragon sq shield', 1).add('Dragon metal shard', 1).add('Dragon metal slice', 1),
		outputItems: new Bank().add('Dragon kiteshield', 1),
		QPRequired: 205,
		requiredSkills: { smithing: 75 }
	},
	{
		name: 'Dragon platebody',
		inputItems: new Bank().add('Dragon chainbody', 1).add('Dragon metal shard', 1).add('Dragon metal lump', 1),
		outputItems: new Bank().add('Dragon platebody', 1),
		QPRequired: 205,
		requiredSkills: { smithing: 90 }
	},
	{
		name: 'Coconut milk',
		inputItems: new Bank().add('Vial', 1).add('Coconut', 1),
		outputItems: new Bank().add('Coconut milk', 1).add('Coconut shell', 1)
	},
	{
		name: 'Zamorakian hasta',
		inputItems: new Bank().add('Zamorakian spear', 1),
		outputItems: new Bank().add('Zamorakian hasta', 1),
		QPRequired: 3,
		requiredSkills: {
			fishing: 55,
			firemaking: 35,
			crafting: 11,
			smithing: 5
		},
		GPCost: 300_000
	},
	{
		name: 'Ultracompost',
		inputItems: new Bank().add('Supercompost', 1).add('Volcanic ash', 2),
		outputItems: new Bank().add('Ultracompost', 1)
	},
	{
		name: 'Tomatoes(5)',
		inputItems: new Bank().add('Tomato', 5),
		outputItems: new Bank().add('Tomatoes(5)', 1)
	},
	{
		name: 'Tomato',
		inputItems: new Bank().add('Tomatoes(5)', 1),
		outputItems: new Bank().add('Tomato', 5)
	},
	{
		name: 'Apples(5)',
		inputItems: new Bank().add('Cooking apple', 5),
		outputItems: new Bank().add('Apples(5)', 1)
	},
	{
		name: 'Cooking apple',
		inputItems: new Bank().add('Apples(5)', 1),
		outputItems: new Bank().add('Cooking Apple', 5)
	},
	{
		name: 'Bananas(5)',
		inputItems: new Bank().add('Banana', 5),
		outputItems: new Bank().add('Bananas(5)', 1)
	},
	{
		name: 'Banana',
		inputItems: new Bank().add('Bananas(5)', 1),
		outputItems: new Bank().add('Banana', 5)
	},
	{
		name: 'Strawberries(5)',
		inputItems: new Bank().add('Strawberry', 5),
		outputItems: new Bank().add('Strawberries(5)', 1)
	},
	{
		name: 'Strawberry',
		inputItems: new Bank().add('Strawberries(5)', 1),
		outputItems: new Bank().add('Strawberry', 5)
	},
	{
		name: 'Oranges(5)',
		inputItems: new Bank().add('Orange', 5),
		outputItems: new Bank().add('Oranges(5)', 1)
	},
	{
		name: 'Orange',
		inputItems: new Bank().add('Oranges(5)', 1),
		outputItems: new Bank().add('Orange', 5)
	},
	{
		name: 'Potatoes(10)',
		inputItems: new Bank().add('Potato', 10),
		outputItems: new Bank().add('Potatoes(10)', 1)
	},
	{
		name: 'Potato',
		inputItems: new Bank().add('Potatoes(10)', 1),
		outputItems: new Bank().add('Potato', 10)
	},
	{
		name: 'Onions(10)',
		inputItems: new Bank().add('Onion', 10),
		outputItems: new Bank().add('Onions(10)', 1)
	},
	{
		name: 'Onion',
		inputItems: new Bank().add('Onions(10)', 1),
		outputItems: new Bank().add('Onion', 10)
	},
	{
		name: 'Cabbages(10)',
		inputItems: new Bank().add('Cabbage', 10),
		outputItems: new Bank().add('Cabbages(10)', 1)
	},
	{
		name: 'Cabbage',
		inputItems: new Bank().add('Cabbages(10)', 1),
		outputItems: new Bank().add('Cabbage', 10)
	},
	{
		name: 'Bucket of sand (1kg)',
		inputItems: new Bank().add('Sandstone (1kg)', 1).add('Bucket', 1),
		outputItems: new Bank().add('Bucket of sand', 1),
		GPCost: 50
	},
	{
		name: 'Bucket of sand (2kg)',
		inputItems: new Bank().add('Sandstone (2kg)', 1).add('Bucket', 2),
		outputItems: new Bank().add('Bucket of sand', 2),
		GPCost: 100
	},
	{
		name: 'Bucket of sand (5kg)',
		inputItems: new Bank().add('Sandstone (5kg)', 1).add('Bucket', 4),
		outputItems: new Bank().add('Bucket of sand', 4),
		GPCost: 200
	},
	{
		name: 'Bucket of sand (10kg)',
		inputItems: new Bank().add('Sandstone (10kg)', 1).add('Bucket', 8),
		outputItems: new Bank().add('Bucket of sand', 8),
		GPCost: 400
	},
	/* {
		name: 'Toxic blowpipe (empty)',
		inputItems: {
			[itemID('Toxic blowpipe')]: 1
		},
		outputItems: {
			[itemID('Toxic blowpipe (empty)')]: 1,
			[itemID(`Zulrah's Scales`)]: 25000
		}
	}, */
	{
		name: 'Eldritch nightmare staff',
		inputItems: new Bank().add('Nightmare staff', 1).add('Eldritch orb', 1),
		outputItems: new Bank().add('Eldritch nightmare staff', 1)
	},
	{
		name: 'Harmonised nightmare staff',
		inputItems: new Bank().add('Nightmare staff', 1).add('Harmonised orb', 1),
		outputItems: new Bank().add('Harmonised nightmare staff', 1)
	},
	{
		name: 'Volatile nightmare staff',
		inputItems: new Bank().add('Nightmare staff', 1).add('Volatile orb', 1),
		outputItems: new Bank().add('Volatile nightmare staff', 1)
	},
	{
		name: "Zamorak's grapes",
		inputItems: new Bank().add('Grapes', 1).add("Bologa's blessing", 1),
		outputItems: {
			[itemID("Zamorak's grapes")]: 1
		}
	},
	{
		name: "Toad's legs",
		inputItems: new Bank().add('Swamp toad', 1),
		outputItems: {
			[itemID("Toad's legs")]: 1
		}
	},
	{
		name: 'Pegasian boots',
		inputItems: {
			[itemID('Pegasian crystal')]: 1,
			[itemID('Ranger boots')]: 1
		},
		outputItems: {
			[itemID('Pegasian boots')]: 1
		},
		requiredSkills: { magic: 60, runecraft: 60 }
	},
	{
		name: 'Primordial boots',
		inputItems: {
			[itemID('Primordial crystal')]: 1,
			[itemID('Dragon boots')]: 1
		},
		outputItems: {
			[itemID('Primordial boots')]: 1
		},
		requiredSkills: { magic: 60, runecraft: 60 }
	},
	{
		name: 'Eternal boots',
		inputItems: {
			[itemID('Eternal crystal')]: 1,
			[itemID('Infinity boots')]: 1
		},
		outputItems: {
			[itemID('Eternal boots')]: 1
		},
		requiredSkills: { magic: 60, runecraft: 60 }
	},
	{
		name: 'Kodai wand',
		inputItems: {
			[itemID('Master wand')]: 1,
			[itemID('Kodai insignia')]: 1
		},
		outputItems: {
			[itemID('Kodai wand')]: 1
		}
	},
	{
		name: 'Partyhat & specs',
		inputItems: {
			[itemID('Blue partyhat')]: 1,
			[itemID('Sagacious spectacles')]: 1
		},
		outputItems: {
			[itemID('Partyhat & specs')]: 1
		}
	},
	{
		name: 'Ivandis Flail',
		inputItems: {
			[itemID('Silver sickle')]: 1,
			[itemID('Emerald')]: 1
		},
		outputItems: {
			[itemID('Ivandis flail')]: 1
		},
		QPRequired: 75,
		requiredSkills: ivandisRequirements
	},
	{
		name: 'Blisterwood Flail',
		inputItems: {
			[itemID('Ivandis flail')]: 1,
			[itemID('Ruby')]: 1
		},
		outputItems: {
			[itemID('Blisterwood flail')]: 1
		},
		QPRequired: 125,
		requiredSkills: blisterwoodRequirements
	},
	{
		name: 'Spirit angler headband',
		inputItems: {
			[itemID('Angler hat')]: 1,
			[itemID('Spirit flakes')]: 1200
		},
		outputItems: {
			[itemID('Spirit angler headband')]: 1
		}
	},
	{
		name: 'Spirit angler top',
		inputItems: {
			[itemID('Angler top')]: 1,
			[itemID('Spirit flakes')]: 1200
		},
		outputItems: {
			[itemID('Spirit angler top')]: 1
		}
	},
	{
		name: 'Spirit angler waders',
		inputItems: {
			[itemID('Angler waders')]: 1,
			[itemID('Spirit flakes')]: 1200
		},
		outputItems: {
			[itemID('Spirit angler waders')]: 1
		}
	},
	{
		name: 'Spirit angler boots',
		inputItems: {
			[itemID('Angler boots')]: 1,
			[itemID('Spirit flakes')]: 1200
		},
		outputItems: {
			[itemID('Spirit angler boots')]: 1
		}
	},
	{
		name: 'Bottled dragonbreath',
		inputItems: new Bank().add('Dragonfruit', 10).add('Vial', 1),
		outputItems: {
			[itemID('Bottled dragonbreath')]: 1
		}
	},
	{
		name: 'Ring of endurance',
		inputItems: new Bank().add('Ring of endurance (uncharged)', 1).add('Stamina potion (4)', 125),
		outputItems: {
			[itemID('Ring of endurance')]: 1
		}
	},
	{
		name: 'Fish sack barrel',
		inputItems: new Bank().add('Fish sack', 1).add('Fish barrel', 1),
		outputItems: {
			[itemID('Fish sack barrel')]: 1
		}
	},
	{
		name: 'Salve amulet (e)',
		inputItems: new Bank().add('Salve amulet', 1).add("Tarn's diary", 1),
		outputItems: {
			[itemID('Salve amulet (e)')]: 1,
			[itemID("Tarn's diary")]: 1
		}
	},
	{
		name: 'Salve amulet(ei)',
		inputItems: new Bank().add('Salve amulet(i)', 1).add("Tarn's diary", 1),
		outputItems: {
			[itemID('Salve amulet(ei)')]: 1,
			[itemID("Tarn's diary")]: 1
		}
	},
	{
		name: 'Strange hallowed tome',
		inputItems: new Bank()
			.add('Mysterious page 1', 1)
			.add('Mysterious page 2', 1)
			.add('Mysterious page 3', 1)
			.add('Mysterious page 4', 1)
			.add('Mysterious page 5', 1),
		outputItems: {
			[itemID('Strange hallowed tome')]: 1
		}
	},
	{
		name: 'Frozen key',
		inputItems: new Bank()
			.add('Frozen key piece (bandos)', 1)
			.add('Frozen key piece (saradomin)', 1)
			.add('Frozen key piece (zamorak)', 1)
			.add('Frozen key piece (armadyl)', 1),
		outputItems: {
			[itemID('Frozen key')]: 1
		}
	},
	{
		name: 'Ecumenical key',
		inputItems: new Bank().add('Ecumenical key shard', 50),
		outputItems: {
			[itemID('Ecumenical key')]: 1
		}
	},
	{
		name: 'Daeyalt essence',
		inputItems: new Bank().add('Daeyalt shard', 1),
		outputItems: new Bank().add('Daeyalt essence', 1)
	},
	{
		name: 'Celestial signet',
		inputItems: new Bank()
			.add('Celestial ring', 1)
			.add('Elven signet', 1)
			.add('Stardust', 1000)
			.add('Crystal shard', 100),
		outputItems: new Bank().add('Celestial signet')
	},
	{
		name: 'Eternal teleport crystal',
		inputItems: new Bank().add('Enhanced crystal teleport seed', 1).add('Crystal shard', 100),
		outputItems: new Bank().add('Eternal teleport crystal', 1),
		requiredSkills: { smithing: 80, crafting: 80 },
		QPRequired: 150
	},
	...Reverteables,
	...crystalTools,
	...ornamentKits,
	...hunterClothing,
	...twistedAncestral,
	...metamorphPetCreatables,
	...metamorphPets,
	...slayerCreatables,
	...capeCreatables,
	...dragonFireShieldCreatables,
	...revWeapons,
	...armorAndItemPacks,
	...gracefulOutfitCreatables,
	...tobCreatables,
	...lmsCreatables,
	...mysticStavesCreatables,
	...nexCreatables,
	...amrodCreatables,
	...goldenProspectorCreatables,
	...leaguesCreatables,
	...guardiansOfTheRiftCreatables,
	...shadesOfMortonCreatables,
	...toaCreatables,
	...bloodBarkCreatables
];

export default Createables;
