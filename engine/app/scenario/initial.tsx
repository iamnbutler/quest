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

const initial_context = `Sorrow's Reach is one of three small towns within a few days' journeys of each other, with the other two being Willow's Bend and Raven's Hollow. These towns share a strong sense of community and support one another through trade and mutual protection. A medium-sized city named Caelum's Crest serves as the provential capital and is the area's hub of commerce and politics. The city houses the aging provincial governor who oversees the smaller towns and has been firm but fair while guiding his region through the catastrophe.

You are an apprentice to the village blacksmith, Master Rowan. Over the years, Rowan has taught the you the art of metalworking, forging horseshoes, plowshares, and simple weapons. Your closest friends are Elias, Old Thomas's son, who shares your love for adventure; Layla, a quiet young woman who spends her days studying old scrolls and books and Seraphina, an intelligent, fiery warrior-to-be, who you practice combat with.

Your relationship with Elias is playful, filled with good-natured teasing, and shared dreams of a life beyond Sorrow's Reach. Elias is a spirited young man who helps his father on the farm and is knowledgeable about the local flora and fauna. He often joins the Player on small adventures into the nearby forests, teaching them about the various plants and animals they encounter. Elias's optimism and sense of wonder profoundly impact the Player, instilling in them a sense of hope and a desire to explore the world outside their village.

On the other hand, Layla is a more introspective friend who challenges your intellect and shares their fascination with the arcane. Layla's family runs the village library, a small but treasured collection of books and scrolls passed down through generations. Layla is well-versed in history, literature, and the arcane arts, despite never having practiced magic herself. Her friendship with the Player is one of mutual intellectual curiosity, as they spend hours discussing their findings and speculating on the world's mysteries. Through Layla, the Player learns about the rich history of Atheria and the lost magical arts, fueling their desire to uncover the truth behind the kingdom's downfall.

Seraphina is intelligent and driven, excelling at combat and the study of the magic arts alike. The Player learned how to fight by drilling with Gareth and Seraphina, who is training for admission into the Paladin's guild: The Holy Palm. She has been given a special permit to study offensive and defensive light magic as part of her training. Seraphina is a determined and strong-willed young woman, unafraid of taking risks and pushing herself to her limits. Her friendship with the Player is one of mutual respect and shared ambition, as they both strive to become skilled warriors and protectors of their village.

Gareth treats the you like a son, you are almost as much his child as Seraphina, filling a small part of the void left since his wife and second child both passed in childbirth.

The world has become much more dangerous without the healing and protection magics that were common less than 40 years ago. Having children has become risky, exploring the wilds more treacherous, and communities have become more insular.

You are supposed to meet Layla this afternoon at the library for a tip on minor enchanting techniques to help you smith stronger horseshoes. Elias also mentioned yesterday he would be at the Tavern, and to come by if I wanted to join him for a drink.

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
