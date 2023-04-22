'use client'

import Prologue from './../story/0_sorrows_reach.mdx';
import Actions from './action';

export default function Home() {

    const firstDecisions = [
        'Head straight to the library',
        'Go for a walk around the town',
        'Go to the tavern to meet Elias',
        "Finish up a bit of blacksmithing before your meeting"]

    const initial_party_members = `
- Player
    - Apprentice to Master Rowan
    - Friends: Elias, Layla, Seraphina
    - Learns combat with Seraphina, Gareth
    - Bond with Gareth like family
    - Seeks Atheria's downfall truth`

    return (
        <>
            <Prologue />
            <Actions
                context=''
                actions={firstDecisions}
                party_members={initial_party_members}
            />
        </>
    )
}
