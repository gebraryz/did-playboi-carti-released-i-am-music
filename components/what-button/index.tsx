'use client';

import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

export const WhatButton: FC<{ className?: string }> = ({ className }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newAudio = new Audio('/what.mp3');
      setAudio(newAudio);
    }
  }, []);

  const play = () => {
    if (audio) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });

      setIsShaking(true);
      audio.onended = () => {
        setIsShaking(false);
      };
    }
  };

  useEffect(() => {
    if (isShaking) {
      document.body.classList.add('shake');
    } else {
      document.body.classList.remove('shake');
    }

    return () => {
      document.body.classList.remove('shake');
    };
  }, [isShaking]);

  return (
    <button
      type="button"
      onClick={play}
      className={clsx(
        'bg-white text-black py-2 px-4 uppercase font-bold text-xl hover:opacity-60',
        className
      )}
    >
      <i>WHAT</i>
    </button>
  );
};
