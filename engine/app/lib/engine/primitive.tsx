'use client'
import React, { useState, useEffect } from 'react';
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
    onChoose: (choice: string, index: number) => void;
}

export const OptionInput: React.FC<OptionInputProps> = ({ choices, onChoose }) => {
    return (
        <VStack size={'md'} el={'list'} className="flex flex-col pt-2 pb-3 list-decimal ml-7">
            {choices.map((choice, index) => (
                <li key={index} onClick={() => onChoose(choice, index)}>
                    {choice}
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


interface LoadingIndicatorProps {
    dotInterval?: number;
    maxDots?: number;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    dotInterval = 200,
    maxDots = 5
}) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setDots(prev => prev.length >= maxDots ? '.' : prev + '.');
        }, dotInterval);

        return () => clearInterval(timer);
    }, [dotInterval, maxDots]);

    return <p>{dots}</p>;
};
