
export interface VehicleData {
  id: number;
  model: string;
  year: number;
  price: number;
  image: string;
  features: string[];
  inStock: number;
  color: string;
}

export const inventory: VehicleData[] = [
  {
    id: 1,
    model: 'Dodge Ram 1500',
    year: 2025,
    price: 38000,
    image: '/lovable-uploads/832b4165-5082-4a12-9ea7-84ebd50a41a2.png',
    features: [
      'Crew/Quad/Regular Cab Options',
      'Up to 12,750 lbs towing capacity',
      'Perfect for Taylorville farmers',
      'Available 4x4 for Illinois winters'
    ],
    inStock: 7,
    color: 'Bright White'
  },
  {
    id: 2,
    model: 'Dodge Charger',
    year: 2025,
    price: 32000,
    image: '/lovable-uploads/85c5470c-e869-42d4-a384-94b139a50bf0.png',
    features: [
      'SXT, GT, and R/T trims',
      'Powerful performance engine',
      'Sporty design',
      'Advanced safety features'
    ],
    inStock: 5,
    color: 'Pitch Black'
  },
  {
    id: 3,
    model: 'Dodge Durango',
    year: 2025,
    price: 41000,
    image: '/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png',
    features: [
      '7-seat SUV for families',
      'Up to 8,700 lbs towing',
      'All-wheel drive option',
      'Premium interior options'
    ],
    inStock: 4,
    color: 'Octane Red'
  }
];
