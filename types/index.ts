export type RoomCategory = 'suite' | 'architecture' | 'experience' | 'gastronomy' | 'detail';

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  category: RoomCategory;
  categoryLabel: string;
  url: string;
  alt: string;
  location: string;
  architecturalNote: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  suiteId?: string;
}

export interface HotelSuite {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  sizeSqM: number;
  capacity: string;
  bedType: string;
  view: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  artWork: string;
  artisanNote: string;
}

export interface HotelExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  tag: string;
}

export interface BookingDetails {
  suiteId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  addOns: string[];
}

export interface GuestReview {
  id: string;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  date: string;
  stayedSuite: string;
  comment: string;
}
