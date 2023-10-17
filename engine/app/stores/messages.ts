import { create } from "zustand";

export const INITIAL_MESSAGE: UIMessage = {
  isLoaded: true,
  message: {
    content: [
      "You are Seraphina Grey, a fledgling Paladin of the Church of Tyr, the God of Justice. Raised among the nobility, you've chosen a different path, dedicating yourself to the cause of righteousness.",
      "Over the years, you've dragged your body through gruelling physical training, and persevered to attune your spirit to the divine energies that you command. Though the arcane arts don't come naturally to you, your ironclad determination pushes you through all manner of challenges.",
      `Today finds you in the practice yard, finishing your martial training for the day. As you wipe the sweat from your brow, you look around the bustling city of Waterdeep busy with commerce and noise. It's an exciting place, full of potential adventure and danger.`,
      "It's time to carve your own path in this vast and unpredictable world.",
    ],
    step: 1,
  },
  choices: [
    {
      id: 1,
      text: "Head to the local tavern to gather information on any pressing issues around Waterdeep.",
    },
    {
      id: 2,
      text: "Visit the town board to look for any quests or jobs suitable for a Paladin.",
    },
    {
      id: 3,
      text: "Take a stroll around the city, helping those in need and spreading goodwill as befits a Paladin.",
    },
    {
      id: 4,
      text: "Go to the Church to pray for guidance and seek any divine quests that might be assigned to you.",
    },
    {
      id: 5,
      text: "Visit the bustling marketplace, interacting with the locals or possibly purchasing necessary adventuring gear.",
    },
  ],
};

export type Choice = {
  id: number;
  text: string;
};

export type MessageData = {
  content: string[];
  // TODO: Remove this, it's not needed
  step: number;
};

export type UIMessage = {
  message: MessageData;
  choices: Choice[];
  isLoaded?: boolean;
};

export type MessagesStore = {
  messages: UIMessage[];
  addMessage: (message: UIMessage) => void;
  currentMessage: UIMessage;
  setCurrentMessage: (message: UIMessage) => void;
};

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [INITIAL_MESSAGE],
  addMessage: (message: UIMessage) => {
    set((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  },
  currentMessage: INITIAL_MESSAGE,
  setCurrentMessage: (message: UIMessage) => {
    set((state) => ({
      ...state,
      currentMessage: message,
    }));
  },
}));
