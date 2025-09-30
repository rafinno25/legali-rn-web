export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  text: string;
  date: string;
}

export interface Lawyer {
  id: string;
  name: string;
  photoUrl: string;
  city: string;
  state: string;
  linkedIn?: string;
  practiceAreas: string[];
  hourlyRate: number;
  rating?: number;
  reviewCount?: number;
  responseTime: string;
  casesCompleted: number;
  isAvailable: boolean;
  isVerified?: boolean;
  yearsExperience?: number;
  bio?: string;
  reviews?: Review[];
}