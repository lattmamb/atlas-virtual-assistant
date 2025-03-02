
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Grid, Image } from 'lucide-react';
import { toast } from 'sonner';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface PhotosWidgetProps {
  photos: Photo[];
}

const PhotosWidget: React.FC<PhotosWidgetProps> = ({ photos }) => {
  const handlePhotoClick = (id: number) => {
    toast("Photo viewer coming soon", {
      icon: "🖼️",
      position: "top-center"
    });
  };

  return (
    <AppleWidget 
      title="Photos"
      icon={<Image className="h-5 w-5 text-blue-400" />}
      className="row-span-1 neomorphic"
      headerActionIcon={<Grid className="h-4 w-4" />}
      headerActionTooltip="View All Photos"
    >
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {photos.map(photo => (
            <div 
              key={photo.id} 
              className="aspect-square rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handlePhotoClick(photo.id)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-blue-300">
            View All Photos
          </Button>
        </div>
      </div>
    </AppleWidget>
  );
};

export default PhotosWidget;
