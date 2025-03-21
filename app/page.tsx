import type { FC } from 'react';
import { Status } from '../components/status';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

type Response = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: { url: string; height: number; width: number }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    album_group: string;
  }[];
};

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  const data = await response.json();
  return data.access_token;
};

const checkIfAlbumWasReleased = async (): Promise<boolean> => {
  const PLAYBOI_CARTI_SPOTIFY_ID = '699OTQXzgjhIYAHMy9RyPD';

  const token = await getAccessToken();
  const request = await fetch(
    `https://api.spotify.com/v1/artists/${PLAYBOI_CARTI_SPOTIFY_ID}/albums?` +
      new URLSearchParams({ include_groups: 'album', limit: '5' }),
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const response = (await request.json()) as Response;

  if (!response || !response.items) {
    throw new Error('Failed to fetch albums or no albums available');
  }

  return !!response.items.some((album) => album.name.toLowerCase() === 'music');
};

const HomePage: FC = async () => {
  const isAvailable = await checkIfAlbumWasReleased();

  return <Status isAvailable={isAvailable} />;
};

export default HomePage;
