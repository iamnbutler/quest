interface TextOutputProps {
    content: string[];
}

export const TextOutput: React.FC<TextOutputProps> = ({ content }) => {
    return (
        <div className="flex flex-col gap-2">
            {content.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
};

interface OptionInputProps {
    choices: string[];
    onChoose: (choice: string) => void;
}

export const OptionInput: React.FC<OptionInputProps> = ({ choices, onChoose }) => {
    return (
        <ul className="flex flex-col gap-3 pt-2 pb-6 list-decimal ml-7">
            {choices.map((choice, index) => (
                <li key={index} onClick={() => onChoose(choice)}>
                    {`${choice}`}
                </li>
            ))}
        </ul>
    );
};

interface ContinueButtonProps {
    onContinue: () => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ onContinue }) => {
    return <button onClick={onContinue}>Continue</button>;
};
