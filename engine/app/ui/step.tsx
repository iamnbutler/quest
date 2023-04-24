'use client';

import clsx from "clsx";
import Tooltip from "./tooltip";
import { useState } from "react";
import Typewriter from "react-ts-typewriter";
import { ChatCompletionResponseMessage } from "openai";

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
    id: '1.1.1',
    title: '',
    summary: ''
}

interface StepMetadata {
    location: LocationMetadata
    id: string;
    title: QuestTitle | null;
    summary: string;
}

export function Step({ message }: { message: ChatCompletionResponseMessage | undefined }) {
    const step = EXAMPLE_STEP;
    const { id, title, location } = step;
    const [showChoices, setShowChoices] = useState(false)

    return (
        <section>
            <Header id={id} title={title} location={location} />
            <div className="my-2">
                {message &&
                    <Typewriter
                        text={message.content}
                        speed={8}
                        onFinished={() => {
                            setShowChoices(true)
                        }}
                        cursor={showChoices ? false : true}
                    />
                }
            </div>
            <footer className="border-b border-white/10"></footer>
        </section>
    )
}
