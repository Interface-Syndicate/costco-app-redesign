import { MapPin } from 'lucide-react';

interface LocationBannerProps {
  location: string;
}

export function LocationBanner({ location }: LocationBannerProps) {
  return (
    <div className="bg-[#BDDDFC] px-4 py-3 mb-[25px]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <MapPin className="w-4 h-4 text-[#384959]" />
        <p className="text-[#384959]">{location}</p>
      </div>
    </div>
  );
}
