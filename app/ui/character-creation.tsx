import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Label, Progress } from ".";

export const CharacterCreator = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="inline-flex items-center justify-center border border-white/50 p-1.5 leading-none hover:border-white focus:outline-none">
        Create Character
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/80" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] border border-white/30 bg-black p-[25px] focus:outline-none">
        <Form.Root>
          <Dialog.Title className="m-0 mb-2 text-[17px] font-medium">
            Create a Character
          </Dialog.Title>
          <Progress p={12} />

          <Form.Field name="character-name">
            <Form.Label asChild>
              <Label label="Name" html_for="character-name" />
            </Form.Label>
            <Form.Control asChild>
              <input
                className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center bg-black px-[10px] text-[15px] leading-none text-white outline-none  selection:bg-blue-500/20"
                type="text"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing">Please enter a character name.</Form.Message>
            {/* <Form.ValidityState /> */}
          </Form.Field>
          <Form.Field name="character-lineage">
            <Form.Label asChild>
              <Label label="Lineage" html_for="character-lineage" />
            </Form.Label>
            <Form.Control asChild>
              <input
                className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center bg-black px-[10px] text-[15px] leading-none text-white outline-none  selection:bg-blue-500/20"
                type="text"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing">Please enter a character lineage.</Form.Message>
            {/* <Form.ValidityState /> */}
          </Form.Field>

          <Form.Submit>Finish</Form.Submit>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
