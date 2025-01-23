'use client';

import clsx from 'clsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState, type FC } from 'react';
import { WhatButton } from '../what-button';
import styles from './styles.module.css';

dayjs.extend(duration);

const TIME_FROM_ANNOUNCEMENT = '2024-09-12';
const TIME_FROM_LATEST_ALBUM = '2020-12-25';

const calculateTimeBetweenDates = (time: string) => {
  const now = dayjs();
  const target = dayjs(time);

  let diff = dayjs.duration(target.diff(now));

  if (diff.asMilliseconds() < 0) {
    diff = dayjs.duration(now.diff(target));
  }

  const months = Math.floor(diff.asMonths());
  const days = Math.floor(diff.days() % 30);
  const hours = Math.floor(diff.asHours() % 24);
  const minutes = Math.floor(diff.asMinutes() % 60);

  const data = [
    { value: months, label: 'months' },
    { value: days, label: 'days' },
    { value: hours, label: 'hours' },
    { value: minutes, label: 'minutes' },
  ];

  return data
    .map(({ value, label }) => (value ? `${value} ${label}` : ''))
    .filter(Boolean)
    .join(', ');
};

export const Status: FC<{ isAvailable: boolean }> = ({ isAvailable }) => {
  const [timeFromIAmMusicAnnouncement, setTimeFromIAmMusicAnnouncement] =
    useState(calculateTimeBetweenDates(TIME_FROM_ANNOUNCEMENT));
  const [timeFromLastAlbumRelease, setTimeFromAnnouncement] = useState(
    calculateTimeBetweenDates(TIME_FROM_LATEST_ALBUM)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeFromIAmMusicAnnouncement(
        calculateTimeBetweenDates(TIME_FROM_ANNOUNCEMENT)
      );
      setTimeFromAnnouncement(
        calculateTimeBetweenDates(TIME_FROM_LATEST_ALBUM)
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div
        suppressHydrationWarning
        className={clsx(
          'flex flex-col items-center min-h-screen px-6 lg:text-left text-center',
          isAvailable ? 'justify-center' : 'justify-center lg:justify-start'
        )}
      >
        <h1
          className="lg:text-[400px] text-[100px]"
          style={{ fontFamily: 'var(--font-swiss)' }}
        >
          {isAvailable ? 'YES!!!' : 'No.'}
        </h1>
        {isAvailable ? (
          <>
            <video autoPlay loop className={styles.video}>
              <source src="/evilj0rdan.mp4" type="video/mp4" />
            </video>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <p className="text-xl">
                Since <q>I AM MUSIC</q> announcement:{' '}
                <b>{timeFromIAmMusicAnnouncement}</b>
              </p>
              <p className="text-xl">
                Since <q>Whole Lotta Red</q> release:{' '}
                <b>{timeFromLastAlbumRelease}</b>
              </p>
            </div>
            <WhatButton className="mt-6" />
          </>
        )}
      </div>
    </>
  );
};
