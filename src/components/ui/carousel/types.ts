
export interface PageInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  imageUrl?: string;
}

export interface CarouselCardProps {
  card: PageInfo;
  index: number;
  faceWidth: number;
  faceCount: number;
  radius: number;
  onClick: (card: PageInfo, index: number) => void;
  isDarkMode: boolean;
}
