"use client";

import { useState } from 'react';
import IntroLoader from '@/component/IntroLoader';

export default function ClientLayoutWrapper({ children }) {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro && <IntroLoader onFinish={() => setShowIntro(false)} />}
            {children}
        </>
    );
}