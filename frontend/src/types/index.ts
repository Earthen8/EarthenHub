export interface UserProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  birthday: string;
  avatarUrl: string;
  aboutText: string[];
}

export interface ServiceItem {
  id: string | number;
  title: string;
  description: string;
  iconSvg: React.ReactNode;
}

export interface ExperienceItem {
  id: string | number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
}