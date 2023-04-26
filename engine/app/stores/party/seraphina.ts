import { Companion } from "../party";

const seraphina: Companion = {
    id: "seraphina_grey",
    fullName: "Seraphina Grey",
    firstName: "Seraphina",
    lastName: "Grey",
    personality: "determined, strong-willed, poised, graceful",
    appearance: "elegant, noble bearing",
    notableCharacter: true,
    backstory: "Born into an 8th generation noble family. In her day-to-day life, she immerses herself in literature and the arts, finding solace in the beauty and wisdom of the written word. She also works at honing her diplomatic skills despite hating their roundabout nature. Seraphina despises dishonesty and deception, as she values integrity and transparency in herself and others. Seraphina joined the Mage's Guild 2 years ago to fufill the magic requirements on her path to become a Paladin. Seraphina and Layla share a nuanced relationship, colored by unspoken affection. Oblivious to Layla's romantic feelings, Seraphina cherishes their friendship and the help Layla has given her studying magic. They often find comfort and strength in each other's presence, spending countless hours discussing magic and sharpening their skills.",
    motivations: "Restore her family's honor, self-improvement, protect and guide those under her command, find a worthy partner that will support her ambitions",
    flaws: "Deep-seated fear of failure, overreaction to setbacks, overcautious approach, overly critical of herself, oblivious to the emotions of others",
    relationships: [
        {
            name: "Elias",
            type: "friend",
        },
        {
            name: "Layla",
            type: "friend",
        }
    ],
    romanceable: true,
    traits: {
        openness: 7,
        conscientiousness: 9,
        extraversion: 5,
        agreeableness: 7,
        neuroticism: 6,
        ambition: 10,
        empathy: 7,
        creativity: 5,
        humor: 4,
        confidence: 8,
    },
    talents: {
        combat: 8,
        magic: 7,
        stealth: 4,
        thievery: 1,
        archery: 6,
        leadership: 7,
        diplomacy: 6,
        survival: 5,
        crafting: 3,
        knowledge: 8,
    },
    orientation: ["bisexual"],
    values: "integrity, transparency, loyalty, commitment",
};

export default seraphina;
