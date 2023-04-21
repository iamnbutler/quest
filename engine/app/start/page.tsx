'use client'

import Link from 'next/link';
import { useState } from 'react';
import Typewriter from 'react-ts-typewriter';
import Intro from './intro.mdx';

export default function Home() {
    const [showContinue, setShowContinue] = useState(false)

    return (
        <>
            <Intro />
        </>
    )
}
