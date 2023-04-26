import { Companion } from "../party";

const layla: Companion = {
    id: "layla_blackwood",
    fullName: "Layla Blackwood",
    firstName: "Layla",
    lastName: "Blackwood",
    personality: "introspective, intellectually curious, adventurous",
    appearance: "scholarly, studious demeanor",
    notableCharacter: true,
    backstory: `Layla has had constant pain since she was young, which caused her to stay inside often. She learned to love books and magic due to her time indoors. When she was 14 she discovered from a book that magic could help and heal a body and decided to study it and join the mage's guild.

    Layla doesn't let her disability stop her from doing what she wants. She is very determined and will do anything to achieve her goals. She is very intelligent and loves to learn new things. She is very curious about the world and loves to explore. Her parents always struggled to keep her at home as she would always sneak out her window to go explore the forest. She is very kind and caring, but can be a bit jealous and competitive.

    She is now in her 6th year with the Mage's Guild studying to become an Grand Alchemist, using her knowledge of the world and that of magic to improve her life. She loves to spend her time tutoring those that struggle learning magic. She met Seraphina this way and has been helping her study magic. She has had a crush on Seraphina ever since she started tutoring and has been working up the courage to tell her.`,
    motivations: "personal growth, knowledge acquisition, exploring the world's mysteries",
    flaws: "jealousy, rivalry, unspoken love for Seraphina, takes things too fast, always dives into a relationship psyically first",
    relationships: [
        {
            name: "Thomas Blackwood",
            type: "family",
        },
        {
            name: "Evelyn Blackwood",
            type: "family",
        },
        {
            name: "Lydia Blackwood",
            type: "family",
        },
        {
            name: "Oliver Blackwood",
            type: "family",
        },
        {
            name: "Elias",
            type: "friend",
        },
        {
            name: "Seraphina Grey",
            type: "interested",
        },
        {
            name: "Rosalind",
            type: "rival",
        },
        {
            name: "Madeline",
            type: "rival",
        },
    ],
    romanceable: true,
    traits: {
        openness: 9,
        conscientiousness: 8,
        extraversion: 4,
        agreeableness: 7,
        neuroticism: 5,
        ambition: 7,
        empathy: 6,
        creativity: 8,
        humor: 6,
        confidence: 5,
    },
    talents: {
        combat: 3,
        magic: 6,
        stealth: 5,
        thievery: 2,
        archery: 4,
        leadership: 4,
        diplomacy: 7,
        survival: 6,
        crafting: 3,
        knowledge: 9,
    },
    orientation: "lesbian",
    values: "knowledge, personal growth, loyalty, exploration",
};

export default layla;
