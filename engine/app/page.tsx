"use client";

import Link from "next/link";
import { useState } from "react";
import Typewriter from "react-ts-typewriter";

export default function Home() {
  const [showContinue, setShowContinue] = useState(false);

  return (
    <>
      <h1>The Fall of Atheria</h1>
      <Typewriter
        onFinished={() => setShowContinue(true)}
        speed={10}
        text="In the land of Atheria, once a powerful and prosperous kingdom, ruin and despair now reign. Magic, the kingdom's former backbone, has dwindled into a scarce and dangerous resource. The arcane arts, previously revered, are now feared and strictly regulated by a royal guild known as the Silver Hand. Established by the king to investigate the cause of Atheria's downfall, the guild is determined to restore the kingdom to its former glory."
      />
      <Link
        href="/start"
        className={`block underline mt-2 hover:opacity/60 ${
          showContinue ? "" : "hidden"
        }`}
      >
        Continue
      </Link>
    </>
  );
}
