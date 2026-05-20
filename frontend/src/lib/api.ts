// Detect if code is running on server or client
const IS_SERVER = typeof window === 'undefined';

// Server uses local or Docker internal URL, Browser uses Public URL
export const API_BASE_URL = IS_SERVER
  ? (process.env.NEXT_SERVER_API_URL || 'http://backend:8000/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

/**
 * Universal fetcher with error handling and Next.js ISR/cache support.
 */
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Default to fast revalidation (ISR) for portfolio updates, but allow overrides.
  const defaultOptions: RequestInit = {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      console.error(`API Error on ${url}: ${response.status} ${response.statusText}`);
      // Returning null or empty arrays is safer for the frontend than throwing, 
      // but we throw here to let the specific fetchers handle the fallback data.
      throw new Error(`API failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Network or Parsing Error on ${url}:`, error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Specific Data Fetchers (Server-Side safe)
// ---------------------------------------------------------------------------

import { unstable_cache } from 'next/cache';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';

export const getDisciplines = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/disciplines/`);
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      console.error('Failed to fetch disciplines:', error);
      return [];
    }
  },
  ['disciplines-cache-key'],
  { revalidate: 3600 }
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/projects/`);
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },
  ['projects-cache-key'],
  { revalidate: 3600 }
);

export const getExperiences = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/experiences/`);
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },
  ['experiences-cache-key'],
  { revalidate: 3600 }
);

export const getTools = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tools/`);
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },
  ['tools-cache-key'],
  { revalidate: 3600 }
);

export const getPhilosophy = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/philosophy/`);
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },
  ['philosophy-cache-key'],
  { revalidate: 3600 }
);

export const getCertifications = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/certifications/`);
      if (!response.ok) return [];
      return response.json();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },
  ['certifications-cache-key'],
  { revalidate: 3600 }
);


// Client-side POST function
export async function submitInquiry(data: { name: string; email: string; message: string }) {
  const response = await fetch(`${API_BASE_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit inquiry');
  }

  return await response.json();
}
