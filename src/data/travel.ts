import type { LocalizedText } from "./translations";

export interface TravelLocation {
  name: string;
  country: string;
  lat: number;
  lng: number;
  description?: LocalizedText;
  dates?: string;
  photo?: string;
  lived?: boolean;
}

export const travelLocations: TravelLocation[] = [
  // USA
  {
    name: "Las Vegas",
    country: "USA",
    lat: 36.17,
    lng: -115.14,
    description: {
      en: "Current home base for University of Nevada, Las Vegas, RebelBot, and community-building.",
      it: "Base attuale per University of Nevada, Las Vegas, RebelBot e community-building.",
      es: "Mi base actual para la University of Nevada, Las Vegas, RebelBot y la creación de comunidad.",
    },
    dates: "2020-Present",
    lived: true,
  },
  { name: "San Francisco", country: "USA", lat: 37.77, lng: -122.42 },
  { name: "Los Angeles", country: "USA", lat: 34.05, lng: -118.24 },
  { name: "San Diego", country: "USA", lat: 32.72, lng: -117.16 },
  { name: "New York City", country: "USA", lat: 40.71, lng: -74.01 },
  { name: "Boston", country: "USA", lat: 42.36, lng: -71.06 },
  { name: "Miami", country: "USA", lat: 25.76, lng: -80.19 },
  { name: "Sedona", country: "USA", lat: 34.87, lng: -111.76 },
  { name: "Grand Canyon", country: "USA", lat: 36.1, lng: -112.11 },
  { name: "Yosemite", country: "USA", lat: 37.87, lng: -119.54 },
  { name: "Utah", country: "USA", lat: 39.32, lng: -111.09 },
  { name: "Death Valley", country: "USA", lat: 36.46, lng: -116.87 },
  { name: "Texas", country: "USA", lat: 31.97, lng: -99.9 },
  { name: "New Mexico", country: "USA", lat: 34.52, lng: -105.87 },

  // Mexico
  { name: "Puerto Vallarta", country: "Mexico", lat: 20.65, lng: -105.23 },

  // Canada
  { name: "Toronto", country: "Canada", lat: 43.65, lng: -79.38 },
  { name: "Vancouver", country: "Canada", lat: 49.28, lng: -123.12 },

  // Spain
  {
    name: "Valencia",
    country: "Spain",
    lat: 39.47,
    lng: -0.38,
    description: {
      en: "Birthplace and Spanish roots.",
      it: "Luogo di nascita e radici spagnole.",
      es: "Mi lugar de nacimiento y mis raíces españolas.",
    },
    lived: true,
  },
  { name: "Madrid", country: "Spain", lat: 40.42, lng: -3.7 },

  // Italy
  {
    name: "Rome",
    country: "Italy",
    lat: 41.9,
    lng: 12.5,
    description: {
      en: "A formative chapter in an international school environment.",
      it: "Un capitolo formativo in un ambiente scolastico internazionale.",
      es: "Una etapa que me formó, en un entorno escolar internacional.",
    },
    lived: true,
  },
  { name: "Naples", country: "Italy", lat: 40.85, lng: 14.27 },
  { name: "Gallipoli", country: "Italy", lat: 40.06, lng: 17.99 },

  // Other
  { name: "Malta", country: "Malta", lat: 35.9, lng: 14.51 },
  { name: "Corfu", country: "Greece", lat: 39.62, lng: 19.92 },
  { name: "Dubai", country: "UAE", lat: 25.2, lng: 55.27 },
  { name: "Montenegro", country: "Montenegro", lat: 42.43, lng: 19.26 },
  { name: "Albania", country: "Albania", lat: 41.33, lng: 19.82 },
];
