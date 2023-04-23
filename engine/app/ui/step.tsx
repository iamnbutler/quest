const Header = ({ number, title, location }: Partial<StepMetadata>) => {
    return (
        <header className={'flex jutify-between'}>
            <div className="flex gap-2">
                <div>{number}</div>
                {title && <div>{title}</div>}
            </div>
            <div className="flex">
                {location && <div>{`${location.area}, ${location.province}`}</div>}
                <div>...</div>
            </div>
        </header>
    )
}

type Province = 'Sylveria' | 'Calendria' | 'Kael' | 'Scepter Isle' | 'Darador' | 'Alderac' | 'Calladore' | 'Arcton';
interface Location {
    province: Province;
    area: string;
}

type QuestTitle = string;

const EXAMPLE_STEP: StepMetadata = {
    location: {
        province: 'Sylveria',
        area: 'Haven\'s Crest'
    },
    number: 1,
    title: 'Retrieve the Lost Relic',
    summary: 'The king has tasked you with retrieving the lost relic from the ruins of the ancient temple. Be careful, the ruins are said to be cursed and guarded by powerful magic.'
}

interface StepMetadata {
    location: Location
    number: number;
    title: QuestTitle | null;
    summary: string;
}

export function Step() {
    const step = EXAMPLE_STEP;
    const { number, title, location } = step;

    return (
        <Header number={number} title={title} location={location} />
    )
}
