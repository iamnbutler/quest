'use client';
import clsx from "clsx";
import { useEffect, useState } from "react";
import useCharacterStore from "../stores/character";
import { allLineages, allClasses } from "../lib";

const ContextHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <header className={clsx('flex justify-between text-xs  w-full text-white/50', 'py-2', 'border-y border-white/10')}>
            <div className="flex gap-2 flex-grow">
                {title}
            </div>
            <div className="flex gap-2">
                <div>{subtitle}</div>
            </div>
        </header>
    )
}

const MetaText = ({ children }: { children: string }) => {
    return (
        <div className="text-xs text-white/50">
            {children}
        </div>
    )
}

const UserText = ({ children }: { children: string }) => {
    return (
        <div className="text-amber-200">
            {children}
        </div>
    )
}

const Input = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <input {...props}
            className="bg-inherit placeholder:text-white/50 border-b border-transparent focus:border-white/30 focus:ring-0 focus:outline-none"
        />
    );
}

const NextButton = ({ disabledConditions, onClick }: { disabledConditions?: boolean, onClick: () => void }) => {
    let disabled = disabledConditions || false;

    return (
        <button onClick={onClick}
            style={{ opacity: disabled ? 0.25 : 1, textAlign: 'left' }}
            disabled={disabled}>Next</button>
    )
}

function Home() {
    const { character, setCharacter } = useCharacterStore();
    const [givenName, setGivenName] = useState<string[]>(['']);
    const [familyName, setFamilyName] = useState<string>('');
    const [lineageIx, setLineageIx] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [classIx, setClassIx] = useState<number>(0);

    const handleSetClass = (ix: number) => {
        setClassIx(ix);
        setCurrentStep(currentStep + 1);
        setCharacter({ ...character, classes: [{ name: allClasses[classIx], level: 1 }] });
    }


    const handleSetName = () => {
        setCurrentStep(currentStep + 1);
        setCharacter({ ...character, given_names: givenName, family_name: familyName });
    }

    const handleSetLineage = (ix: number) => {
        setLineageIx(ix);
        setCurrentStep(currentStep + 1);
        setCharacter({ ...character, lineage: allLineages[lineageIx] });
    }

    const name_string_to_arr = (name: string): Array<string> => {
        return name.split(' ').map((name) => name.charAt(0).toUpperCase() + name.slice(1));
    }

    useEffect(() => {
        console.log('Character:', character);
        console.log('Current Step:', currentStep);
        console.log('Given Name:', givenName);
        console.log('Family Name:', familyName);
    }, [character, currentStep, givenName, familyName]);

    return (
        <div className="flex flex-col gap-2">
            <ContextHeader
                title={'New Adventure'}
                subtitle={'Create Your Character'}
            />
            <p>Welcome to Faerûn. What is your name, adventurer?</p>
            {currentStep === 0
                ? (
                    <>
                        <MetaText>Use spaces to add multiple given names.</MetaText>
                        <Input
                            name="given-names"
                            placeholder="Given Name(s)"
                            onChange={(e) => setGivenName(name_string_to_arr(e.target.value))}
                        />
                        <Input
                            name="family-name"
                            placeholder="Family Name"
                            onChange={(e) => setFamilyName(e.target.value)}
                        />
                        <NextButton
                            disabledConditions={givenName[0] === '' || familyName === ''}
                            onClick={() => handleSetName()}
                        />
                    </>
                )
                : (
                    <UserText>{character.name}</UserText>
                )
            }
            {currentStep > 0 && (
                <p>Where do your roots lie?</p>
            )}
            {currentStep === 1
                && (
                    <>
                        {
                            allLineages.map((lineage, ix) => (
                                <button
                                    key={lineage}
                                    onClick={() => {
                                        handleSetLineage(ix);
                                    }}
                                    className={clsx('text-left border hover:border-white/25 border-transparent')}
                                >
                                    {lineage}
                                </button>
                            ))
                        }
                    </>
                )
            }
            {currentStep > 1 && (
                <UserText>{character.lineage}</UserText>
            )}
            {
                currentStep === 2
                && allClasses.map((charClass, ix) => (
                    <button
                        key={charClass}
                        onClick={() => handleSetClass(ix)}
                        className={clsx('text-left border hover:border-white/25 border-transparent')}
                    >
                        {charClass}
                    </button>
                ))
            }
            {currentStep > 2 && (
                <UserText>{character.classes[0].name}</UserText>
            )}
        </div>
    );
}

export default Home;
