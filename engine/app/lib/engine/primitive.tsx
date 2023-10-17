interface TextOutputProps {
    content: string[];
}

export const TextOutput: React.FC<TextOutputProps> = ({ content }) => {
    return (
        <div>
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
        <ul>
            {choices.map((choice, index) => (
                <li key={index} onClick={() => onChoose(choice)}>
                    {choice}
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
