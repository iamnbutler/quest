'use client';

import clsx from "clsx";
import Tooltip from "./tooltip";
import { useEffect, useMemo, useState } from "react";
import Choices from "./choices";
import { UIMessage } from "../stores/messages";
import Questwriter from "../lib/questwriter";

const Location = ({ location }: { location: LocationMetadata }) => {
    return (
        <div className="inline-flex">
            <Tooltip content={location.province.description}>
                <div className="inline-flex cursor-help hover:text-white/80">{location.province.name}</div>
            </Tooltip>
            <span>,&nbsp;</span>
            <Tooltip content={location.area.description}>
                <div className="inline-flex cursor-help hover:text-white/80">{location.area.name}</div>
            </Tooltip>
        </div>
    )
}

const Header = ({ id, location }: Partial<StepMetadata>) => {
    return (
        <header className={clsx('flex jutify-between text-xs flex-grow w-full text-white/50', 'py-2', 'border-y border-white/10')}>
            <div className="flex gap-2 flex-grow">
                {location && <Location location={location} />}
            </div>
            <div className="flex gap-2">
                <div>{id}</div>
            </div>
        </header>
    )
}

type ProvinceName = 'Sylveria' | 'Calendria' | 'Kael' | 'Scepter Isle' | 'Darador' | 'Alderac' | 'Calladore' | 'Arcton';
interface Province {
    name: ProvinceName;
    description: string;
}

interface Area {
    name: string;
    description: string;
}

interface LocationMetadata {
    province: Province;
    area: Area;
}

type QuestTitle = string;

const EXAMPLE_STEP: StepMetadata = {
    location: {
        province: {
            name: 'Arcton',
            description: `Arcton is a province bordering the mysterious kingdom of Drogath. Home to small towns like Sorrow's Reach, Willow's Bend, and Raven's Hollow, it fosters a strong sense of community. The provincial capital, Caelum's Crest, serves as a hub for commerce and politics.`
        },
        area: {
            name: "Sorrow's Reach",
            description: `Sorrow's Reach is a close-knit village in Arcton, surrounded by dense forests. Its residents, including farmers, blacksmiths, and weavers, live a non-magical life. Tensions arise due to Drogath's abundant magic use, but the village remains resilient.`
        }
    },
    id: 1,
    title: '',
    summary: ''
}

interface StepMetadata {
    location: LocationMetadata;
    id: number;
    title: QuestTitle | null;
    summary: string;
}

interface StepMetadata {
    location: LocationMetadata;
    id: number;
    title: QuestTitle | null;
    summary: string;
}

export function Step({
    stepContent,
}: {
    stepContent: UIMessage;
    index: number;
}) {
    const { message, choices } = stepContent;
    const step = EXAMPLE_STEP;
    const { title, location } = step;
    const [showChoices, setShowChoices] = useState(false);
    const [showIndex, setShowIndex] = useState(0);

    const handleTypewriterFinish = () => {
        if (showIndex === message.content.length - 1) {
            setShowChoices(true);
        } else {
            setShowIndex((prevIndex) => prevIndex + 1);
        }
    };

    useEffect(() => {
        setShowIndex(0);
    }, [message.content]);

    const questwriters = useMemo(
        () =>
            message.content.map((text, index) => (
                <Questwriter
                    key={index}
                    text={text}
                    speed={8}
                    onFinished={() => handleTypewriterFinish()}
                    play={index === showIndex}
                />
            )),
        [message.content, showIndex]
    );

    return (
        <section>
            <Header id={message.step} title={title} location={location} />
            <div className="mt-6 mb-7 flex flex-col gap-4">{questwriters}</div>
            <footer className="mt-1 border-t border-white/10">
                <div className={showChoices ? "" : "hidden"}>
                    <Choices choices={choices} />
                </div>
            </footer>
        </section>
    );
}
