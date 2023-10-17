import { VStack } from "../stack";

interface TextOutputProps {
    content: string[];
}

export const TextOutput: React.FC<TextOutputProps> = ({ content }) => {
    return (
        <VStack size={'md'}>
            {content.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </VStack>
    );
};

interface OptionInputProps {
    choices: string[];
    onChoose: (choice: string) => void;
}

export const OptionInput: React.FC<OptionInputProps> = ({ choices, onChoose }) => {
    return (
        <VStack size={'md'} el={'list'} className="flex flex-col pt-2 pb-6 list-decimal ml-7">
            {choices.map((choice, index) => (
                <li key={index} onClick={() => onChoose(choice)}>
                    {`${choice}`}
                </li>
            ))}
        </VStack>
    );
};

interface ContinueButtonProps {
    onContinue: () => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ onContinue }) => {
    return <button onClick={onContinue}>Continue</button>;
};
