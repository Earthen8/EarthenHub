// Detect if code is running on server or client
const IS_SERVER = typeof window === 'undefined';

// Server uses local or Docker internal URL, Browser uses Public URL
export const API_BASE_URL = IS_SERVER
  ? (process.env.NEXT_SERVER_API_URL || 'http://backend:8000/api')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    next: { revalidate: 60 },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      throw new Error(`API failed with status ${response.status} on url ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Network or Parsing Error on ${url}:`, error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Specific Data Fetchers (Server-Side safe)
// ---------------------------------------------------------------------------

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';

export async function getDisciplines() {
  try {
    return await fetchAPI<any[]>('/disciplines/');
  } catch (e) {
    console.error('Failed to get disciplines:', e);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    return await fetchAPI<any[]>('/projects/?featured=true');
  } catch (e) {
    console.error('Failed to get featured projects:', e);
    return [];
  }
}

export async function getExperiences() {
  try {
    return await fetchAPI<any[]>('/experiences/');
  } catch (e) {
    console.error('Failed to get experiences:', e);
    return [];
  }
}

export async function getTools() {
  try {
    return await fetchAPI<any[]>('/tools/');
  } catch (e) {
    console.error('Failed to get tools:', e);
    return [];
  }
}

export async function getPhilosophy() {
  try {
    return await fetchAPI<any>('/philosophy/');
  } catch (e) {
    console.error('Failed to get philosophy:', e);
    return null;
  }
}

export async function getCertifications() {
  try {
    return await fetchAPI<any[]>('/certifications/');
  } catch (e) {
    console.error('Failed to get certifications:', e);
    return [];
  }
}

// Client-side POST function
export async function submitInquiry(data: { name: string; email: string; message: string }) {
  const response = await fetch(`${API_BASE_URL}/inquiries/`, {
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