import React, { useState, useEffect, useMemo, useCallback } from "react";

const DEFAULT_SPEED = 30;
const DEFAULT_DELAY = 200;

interface QuestwriterProps {
    text: string | string[];
    speed?: number;
    delay?: number;
    play?: boolean;
    onFinished?: () => void;
    onStart?: () => void;
    debug?: boolean; // new prop
}

/**
 * Custom hook to manage the state and animations for the Questwriter component.
 * @param props - The QuestwriterProps object.
 * @returns An object containing the current string index and character index.
 */
const useQuestwriter = (props: QuestwriterProps) => {
    const {
        text,
        speed = DEFAULT_SPEED,
        delay = DEFAULT_DELAY,
        play = true,
        onFinished = () => { },
        onStart = () => { },
    } = props;
    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [lastFrameTime, setLastFrameTime] = useState(0);

    const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const animate = useCallback(
        (currentTime: number) => {
            if (currentCharIndex === 0) {
                onStart();
            }

            if (currentTime - lastFrameTime >= speed) {
                const isLastString = currentStringIndex === texts.length - 1;
                const isLastChar =
                    currentCharIndex === texts[currentStringIndex].length;

                if (!isLastChar) {
                    setCurrentCharIndex(currentCharIndex + 1);
                } else if (!isLastString) {
                    setTimeout(() => {
                        setCurrentCharIndex(0);
                        setCurrentStringIndex(currentStringIndex + 1);
                    }, delay);
                } else {
                    onFinished();
                }
                setLastFrameTime(currentTime);
            }
        },
        [
            currentCharIndex,
            currentStringIndex,
            delay,
            lastFrameTime,
            onStart,
            onFinished,
            speed,
            texts,
        ]
    );

    useEffect(() => {
        if (!play) return;

        const requestId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(requestId);
        };
    }, [animate, play]);

    return { currentStringIndex, currentCharIndex };
};

/**
 * Questwriter component, animates typing text as specified in the properties.
 * @param props - The QuestwriterProps object.
 * @returns A React element with the animated text.
 */
const Questwriter = (props: QuestwriterProps) => {
    const { currentStringIndex, currentCharIndex } = useQuestwriter(props);
    const texts = useMemo(
        () => (Array.isArray(props.text) ? props.text : [props.text]),
        [props.text]
    );

    if (props.debug) { // render entire text without animation
        return <div>{texts.join("")}</div>;
    }

    return (
        <div>{texts[currentStringIndex].substring(0, currentCharIndex)}</div>
    );
};

export default React.memo(Questwriter);
