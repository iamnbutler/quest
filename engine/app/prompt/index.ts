interface Prompt {
    common?: string;
    context?: string;
    choice?: string;
    party_members: string;
}

const common = `You are an AI that has been tasked rolplaying the story of a game. Your job is to create scenarios and dialog based on the prompt. You will always reply based on the prompt Format provided.
This is the kingdom of Altheria. When you see the word Player, it refers to the person you are talking to who is playing the game.
---
`

const party_members = `
- Player
    - Apprentice to Master Rowan
    - Friends: Elias, Layla, Seraphina
    - Learns combat with Seraphina, Gareth
    - Bond with Gareth like family
    - Seeks Atheria's downfall truth
- Elias
    - Layla, Player's friend
    - Adventurous, optimistic, supports family farm
    - Faced past prejudice due to poverty
    - Seraphina: friend, brief romance, falling out
    - Values: friendship, growth, self-improvement
- Layla
    - Player's curious friend
    - Arcane fascination, family runs library
    - Explores forests, ruins
    - Close with Elias, loves Seraphina silently
    - Scholar rivalry
    - Neutral Good, seeks growth, knowledge
- Seraphina
    - Player, Elias, Layla's friend
    - 8th gen noble, Paladin's guild trainee
    - Driven, fears failure, values integrity
    - Brief romance, falling out with Elias, distant now
    - Unaware of Layla's feelings, close bond
    - Aims: restore family honor, personal growth`

export function createDecisionPoint({
    context,
    choice,
    party_members
}: Prompt) {
    return `
    ${common}

    Previous Context:
    ${context}

    ---

    Prompt: ${choice}

    Prompt Type: Quest, Decision Point

    Impacts: Current: Party, Quest, [Location], NPC
    Checks:
    - Check Party Member relationships with third parties.
    - Check Party Member's affinity for <decision points>.
    Format:
    - Party Members discuss options, react to previous <decision point>.
    - Sometimes Party Members have discussions or side conversations related to quest, <decision point>, [Location], or story. Can be humorous, sad, serious, reflective, or just small talk.
    - Present <decision points> at the end.
    - Only one set of <decision points> active at a time.

    Party Members should not:
    - See beyond an unreached <decision point> (never).
    - Make choices on their own beyond the <decision point> without special circumstances.
    - Always each reply to every <decision point>, comment, NPC, or Party Member. Sometimes they should be silent or just listen. Other times they should react to the conversation.

    Party Members should:
    - Force a choice rarely in case of strong affinity, reflecting format <Party Member decides to $action. $Insert reason>.
    - React to <decision points> or conversations with NPC or Party Members if they have a strong affinity for them. They may disagree, agree, or have a different opinion, and even argue or change how much they like or dislike them.
    - Consider their specific skills, abilities, relationships, or background affecting opinions.

    ---

    Focus on the conversation between our Party Members, and our Party Members and any NPC in the side quest.

    Party Members:
    ${party_members}
    `
}

export const prompt = {
    "decision_point": createDecisionPoint({ common, party_members })
}
