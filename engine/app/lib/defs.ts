export const lineages = {
    dragonborn: 'Dragonborn',
    dwarf: 'Dwarf',
    elf: 'Elf',
    gnome: 'Gnome',
    half_elf: 'Half-Elf',
    half_orc: 'Half-Orc',
    halfling: 'Halfling',
    human: 'Human',
    tiefling: 'Tiefling'
} as const;

export const class_details = {
    artificer: {
        name: 'Artificer',
        description: "Makers of magic-infused objects, artificers are defined by their inventive nature.",
        subclasses: {
            alchemist: 'Alchemist',
            armorer: 'Armorer',
            artillerist: 'Artillerist',
            battle_smith: 'Battle Smith',
        }
    },
    barbarian: {
        name: 'Barbarian',
        description: "For some, their rage springs from a communion with fierce animal spirits.",
        subclasses: {
            ancestral_guardian: 'Path of the Ancestral Guardian',
            battle_rager: 'Path of the Battlerager',
            beast: 'Path of the Beast',
            berserker: 'Path of the Berserker',
            storm_herald: 'Path of the Storm Herald',
            totem_warrior: 'Path of the Totem Warrior',
            wild_magic: 'Path of Wild Magic',
            zealot: 'Path of the Zealot',
        }
    },
    bard: {
        name: 'Bard',
        description: "Whether scholar, skald, or scoundrel, a bard weaves magic through words and music.",
        subclasses: {
            creation: 'College of Creation',
            eloquence: 'College of Eloquence',
            glamour: 'College of Glamour',
            lore: 'College of Lore',
            spirits: 'College of Spirits',
            swords: 'College of Swords',
            valor: 'College of Valor',
            whispers: 'College of Whispers',
        }
    },
    blood_hunter: {
        name: 'Blood Hunter',
        description: "Often feared or misunderstood, and driven by an unending drive to destroy the wicked, blood hunters are clever, arcane warriors.",
        subclasses: {
            ghost_slayer: 'Order of the Ghostslayer',
            lycan: 'Order of the Lycan',
            mutant: 'Order of the Mutant',
            profane_soul: 'Order of the Profane Soul',
        }
    },
    cleric: {
        name: 'Cleric',
        description: "Clerics are intermediaries between the mortal world and the distant planes of the gods.",
        subclasses: {
            arcana_domain: 'Arcana Domain',
            death_domain: 'Death Domain',
            forge_domain: 'Forge Domain',
            grave_domain: 'Grave Domain',
            knowledge_domain: 'Knowledge Domain',
            life_domain: 'Life Domain',
            light_domain: 'Light Domain',
            nature_domain: 'Nature Domain',
            order_domain: 'Order Domain',
            peace_domain: 'Peace Domain',
            tempest_domain: 'Tempest Domain',
            trickery_domain: 'Trickery Domain',
            twilight_domain: 'Twilight Domain',
            war_domain: 'War Domain',
            ambition_domain: 'Ambition Domain',
            solidarity_domain: 'Solidarity Domain',
            strength_domain: 'Strength Domain',
            zeal_domain: 'Zeal Domain',
            fate_domain: 'Fate Domain',
        }
    },
    druid: {
        name: 'Druid',
        description: "Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury.",
        subclasses: {
            circle_of_dreams: 'Circle of Dreams',
            circle_of_the_land: 'Circle of the Land',
            circle_of_the_moon: 'Circle of the Moon',
            circle_of_the_shepherd: 'Circle of the Shepherd',
            circle_of_spores: 'Circle of Spores',
            circle_of_stars: 'Circle of Stars',
            circle_of_wildfire: 'Circle of Wildfire',
            circle_of_the_primeval: 'Circle of the Primeval',
        }
    },
    fighter: {
        name: 'Fighter',
        description: "Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat.",
        subclasses: {
            arcane_archer: 'Arcane Archer',
            banneret: 'Banneret',
            battle_master: 'Battle Master',
            cavalier: 'Cavalier',
            champion: 'Champion',
            echo_knight: 'Echo Knight',
            eldritch_knight: 'Eldritch Knight',
            psi_warrior: 'Psi Warrior',
            rune_knight: 'Rune Knight',
            samurai: 'Samurai',
        }
    },
    monk: {
        name: 'Monk',
        description: "Monks are united in their ability to magically harness the energy that flows in their bodies.",
        subclasses: {
            way_of_mercy: 'Way of Mercy',
            way_of_the_ascendant_dragon: 'Way of the Ascendant Dragon',
            way_of_the_astral_self: 'Way of the Astral Self',
            way_of_the_drunken_master: 'Way of the Drunken Master',
            way_of_the_four_elements: 'Way of the Four Elements',
            way_of_the_kensei: 'Way of the Kensei',
            way_of_the_long_death: 'Way of the Long Death',
            way_of_the_open_hand: 'Way of the Open Hand',
            way_of_shadow: 'Way of Shadow',
            way_of_the_sun_soul: 'Way of the Sun Soul',
        }
    },
    paladin: {
        name: 'Paladin',
        description: "Whether sworn before a god's altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as the only witness, a paladin's oath is a powerful bond.",
        subclasses: {
            oath_of_the_ancients: 'Oath of the Ancients',
            oath_of_conquest: 'Oath of Conquest',
            oath_of_the_crown: 'Oath of the Crown',
            oath_of_devotion: 'Oath of Devotion',
            oath_of_glory: 'Oath of Glory',
            oath_of_redemption: 'Oath of Redemption',
            oath_of_vengeance: 'Oath of Vengeance',
            oath_of_the_watchers: 'Oath of the Watchers',
            oathbreaker: 'Oathbreaker',
        }
    },

    ranger: {
        name: 'Ranger',
        description: "Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.",
        subclasses: {
            beast_master_conclave: 'Beast Master Conclave',
            drake_warden: 'Drakewarden',
            fey_wanderer: 'Fey Wanderer',
            gloom_stalker_conclave: 'Gloom Stalker Conclave',
            horizon_walker_conclave: 'Horizon Walker Conclave',
            hunter_conclave: 'Hunter Conclave',
            monster_slayer_conclave: 'Monster Slayer Conclave',
            swarmkeeper: 'Swarmkeeper',
        }
    },

    rogue: {
        name: 'Rogue',
        description: "Rogues rely on skill, stealth, and their foes' vulnerabilities to get the upper hand in any situation.",
        subclasses: {
            arcane_trickster: 'Arcane Trickster',
            assassin: 'Assassin',
            inquisitive: 'Inquisitive',
            mastermind: 'Mastermind',
            phantom: 'Phantom',
            scout: 'Scout',
            soulknife: 'Soulknife',
            swashbuckler: 'Swashbuckler',
            thief: 'Thief',
        }
    },
    sorcerer: {
        name: 'Sorcerer',
        description: "Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces.",
        subclasses: {
            aberrant_mind: 'Aberrant Mind',
            clockwork_soul: 'Clockwork Soul',
            draconic_bloodline: 'Draconic Bloodline',
            divine_soul: 'Divine Soul',
            lunar_sorcery: 'Lunar Sorcery',
            shadow_magic: 'Shadow Magic',
            storm_sorcery: 'Storm Sorcery',
            wild_magic: 'Wild Magic',
            pyromancy: 'Pyromancy',
        }
    },
    warlock: {
        name: 'Warlock',
        description: "Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse.",
        subclasses: {
            archfey: 'Archfey',
            celestial: 'Celestial',
            fathomless: 'Fathomless',
            fiend: 'Fiend',
            genie: 'The Genie',
            great_old_one: 'Great Old One',
            hexblade: 'Hexblade',
            undead: 'Undead',
            undying: 'Undying',
        }
    },

    wizard: {
        name: 'Wizard',
        description: "Wizards are supreme magic-users, defined and united as a class by the spells they cast.",
        subclasses: {
            school_of_abjuration: 'School of Abjuration',
            school_of_bladesinging: 'School of Bladesinging',
            school_of_chronurgy: 'School of Chronurgy',
            school_of_conjuration: 'School of Conjuration',
            school_of_divination: 'School of Divination',
            school_of_enchantment: 'School of Enchantment',
            school_of_evocation: 'School of Evocation',
            school_of_graviturgy: 'School of Graviturgy',
            school_of_illusion: 'School of Illusion',
            school_of_necromancy: 'School of Necromancy',
            order_of_scribes: 'Order of Scribes',
            school_of_transmutation: 'School of Transmutation',
            school_of_war_magic: 'School of War Magic'
        }
    }
} as const
