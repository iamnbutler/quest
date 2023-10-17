"use client";

import clsx from "clsx";
import Choices from "./choices";
import { UIMessage, useMessagesStore } from "../stores/messages";
import { nanoid } from "nanoid";

interface StepMetadata {
  id: number;
  title: string;
}

const Header = ({ id, title }: StepMetadata) => {
  return (
    <header
      className={clsx(
        "flex jutify-between text-xs flex-grow w-full text-white/50",
        "py-2",
        "border-y border-white/10",
      )}
    >
      <div className="flex gap-2 flex-grow">
        <span>{title}</span>
      </div>
      <div className="flex gap-2">
        <div>{id}</div>
      </div>
    </header>
  );
};

export function Step({
  stepContent,
}: {
  stepContent: UIMessage;
  index: number;
}) {
  const { message, choices } = stepContent;
  const step: StepMetadata = {
    id: message.step,
    title: message.content[0],
  };
  const previousMessages = useMessagesStore((state) =>
    state.messages.slice(-4),
  );
  return (
    <section>
      <Header id={step.id} title={step.title} />
      <div className="mt-6 mb-7 flex flex-col gap-4">
        {message.content.map((text) => (
          <div key={nanoid()}>{text}</div>
        ))}
      </div>
      <footer className="mt-1 border-t border-white/10">
        <Choices choices={choices} previousMessages={previousMessages} />
      </footer>
    </section>
  );
}
