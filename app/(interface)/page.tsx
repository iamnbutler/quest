"use client";

import { useChat } from "ai/react";
import { CharacterCreator } from "../ui/character-creation";
import { Dice, d20 } from "../lib/roll";
import { skillCheck } from "../lib/check";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const d8 = new Dice(8);
  const check = skillCheck(15, 2, d20);

  return (
    <main className="mx-auto flex h-full w-full flex-col">
      <div className="flex flex-col">
        <div>You try to intimidate the goblin.</div>
        <div>You need a 15 to succeed.</div>
        <div>You rolled a {check.roll}</div>
        <div>
          {check.isCriticalSuccess
            ? "You critically succeed. The goblin runs off screaming."
            : check.isCriticalFailure
            ? "You critically fail. The goblin knocks you out with his club."
            : check.roll >= 15
            ? "You succeed. The goblin backs off."
            : "You fail. The goblin attacks."}
        </div>
      </div>
      <div>{d8.roll().result}</div>
      <div>
        {d8
          .rollMultiple(4)
          .rolls.map((r) => r.result)
          .join(", ")}
      </div>
      <CharacterCreator />
      <section className="m mb-auto">
        {messages.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </section>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button className="rounded-md border-2 border-solid border-white p-2" type="submit">
          Send
        </button>
      </form>
    </main>
  );
}
