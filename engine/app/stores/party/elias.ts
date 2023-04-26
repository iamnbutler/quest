import { Companion } from "../party";

export const elias: Companion = {
    id: "elias_wyndham",
    fullName: "Elias Wyndham",
    firstName: "Elias",
    lastName: "Wyndham",
    personality: "Resilient, compassionate, and adventurous",
    appearance: "Tall, lean, with short, messy brown hair and piercing blue eyes",
    notableCharacter: true,
    backstory: "As a child, Elias faced a myriad of challenges that shaped the resilient, compassionate man he would become. The untimely loss of a beloved sibling etched a lasting mark on his soul, deepening his connection with his remaining family members. Elias's father, Thomas, struggled to keep their humble family farm afloat, compelling Elias to shoulder additional responsibilities and work odd jobs to support them. This burden ignited within Elias a fear of being left behind by his more academically inclined friends, such as Layla and the Player. Yet, Elias's dedication to his family remained unwavering. He shared a special bond with his younger sister, Emma, who idolized him. Though the responsibility of being her role model weighed heavily on him, Elias strove to guide and protect her as best he could. His relationship with his father, Thomas, was complex. Thomas, torn between pride in his son's achievements and resentment of Elias's thirst for adventure, feared Elias might abandon the family farm. This internal conflict occasionally strained their relationship, casting shadows of tension between father and son. Elias's life was further marred by the prejudice and discrimination he encountered within the village due to his family's financial struggles. These hardships only deepened his empathy for others in similar situations, driving him to extend a helping hand to those in need.",
    motivations: "Elias is driven by a sense of duty to his family and a desire for adventure and new experiences.",
    flaws: "Elias's fear of being left behind by his more academically inclined friends and the weight of being a role model to his younger sister can sometimes cause him to doubt himself and his abilities.",
    relationships: [
        {
            name: "Layla",
            type: "friend"
        },
        {
            name: "Seraphina",
            type: ["ex-romantic", "interested"]
        }
    ],
    romanceable: true,
    traits: {
        openness: 7,
        conscientiousness: 6,
        extraversion: 5,
        agreeableness: 9,
        neuroticism: 3,
        ambition: 4,
        empathy: 8,
        creativity: 7,
        humor: 6,
        confidence: 5
    },
    talents: {
        combat: 6,
        magic: 3,
        stealth: 4,
        thievery: 4,
        archery: 5,
        leadership: 7,
        diplomacy: 6,
        survival: 8,
        crafting: 6,
        knowledge: 5
    },
    orientation: "straight",
    values: "Elias values family, adventure, empathy, and personal growth."
};

export default elias;
