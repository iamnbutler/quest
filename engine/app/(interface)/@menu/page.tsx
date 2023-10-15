'use client'

import useCharacterStore from "@/app/stores/character"

export default function Page() {
    const { character } = useCharacterStore()

    const { name, lineage, classes, level } = character

    return (
        <div>
            <h2>Character Sheet</h2>
            <p>{name}</p>
            <p>{`${lineage} ${classes[0].name} ${classes[0].level}`}</p>
            <p>{`Level ${level}`}</p>
        </div>
    )
}
