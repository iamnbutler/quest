"use client";
import React, { useState, useEffect } from "react";
import { VStack } from "../stack";

interface TextOutputProps {
  content: string[];
}

export const TextOutput: React.FC<TextOutputProps> = ({ content }) => {
  return (
    <VStack size={"md"}>
      {content.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </VStack>
  );
};

interface LoadingIndicatorProps {
  dotInterval?: number;
  maxDots?: number;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  dotInterval = 200,
  maxDots = 5,
}) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= maxDots ? "." : prev + "."));
    }, dotInterval);

    return () => clearInterval(timer);
  }, [dotInterval, maxDots]);

  return <p>{dots}</p>;
};
