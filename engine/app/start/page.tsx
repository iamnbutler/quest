'use client'

import Link from 'next/link';
import Intro from './intro.mdx';

export default function Home() {

    return (
        <>
            <Intro />
            <Link href="/game">Continue</Link>
        </>
    )
}
