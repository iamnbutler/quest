import { UIMessage } from "@/app/stores/messages";

export type Scenario = {
    id: number;
    content: UIMessage;
    pickedChoice?: number;
};

export const createNewScenario = (id: number): Scenario => ({
    id,
    content: {
        message: {
            content: [],
            step: 0,
        },
        choices: [],
    },
});

export const updateScenarioContent = (scenario: Scenario, newContent: UIMessage): Scenario => {
    return {
        ...scenario,
        content: newContent,
    };
};

export const updateScenarioPickedChoice = (scenario: Scenario, newChoice: number): Scenario => {
    return {
        ...scenario,
        pickedChoice: newChoice,
    };
};
