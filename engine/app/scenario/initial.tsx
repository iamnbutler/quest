'use client'

import { decisionWithContext } from ".";

const intial_text = 'You are supposed to meet Layla this afternoon at the library for a tip on minor enchanting techniques to help you smith stronger horseshoes. Elias also mentioned yesterday he would be at the Tavern, and to come by if I wanted to join him for a drink.'

const initial_decisions = [
    "Head straight to the library",
    "Go for a walk around the town",
    "Go to the tavern to meet Elias",
    "Finish up a bit of blacksmithing before your meeting",
];

const initial_party_members = `
- Player
    - Apprentice to Master Rowan
    - Friends: Elias, Layla, Seraphina
    - Learns combat with Seraphina, Gareth
    - Bond with Gareth like family
    - Seeks Atheria's downfall truth`;

const initial_context = `You are supposed to meet Layla this afternoon at the library for a tip on minor enchanting techniques to help you smith stronger horseshoes. Elias also mentioned yesterday he would be at the Tavern, and to come by if I wanted to join him for a drink.

What will you do first?`;

const InitialScenario = () => {
    const scenario = decisionWithContext({
        text: intial_text,
        context: initial_context,
        actions: initial_decisions,
        party_members: initial_party_members,
    })

    return scenario
}

export default InitialScenario
