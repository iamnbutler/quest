'use client';
import useCharacterStore from "../stores/character";
import { ContextHeader } from "../ui/context-header";

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
            className="hover:underline"
            disabled={disabled}>Continue</button>
    )
}

function Home() {
    const { character, setCharacter } = useCharacterStore();

    return (
        <div className="flex flex-col gap-3">
            <ContextHeader
                title={'New Adventure'}
                subtitle={''}
            />
            <p>You play as {character.name}, a Level {character.level} {character.classes[0].name}.</p>
            <p>{character.backstory}</p>
            <p>Welcome to Faerûn. Adventure forth.</p>
            <NextButton
                onClick={() => { }}
            />
        </div>
    );
}

export default Home;
