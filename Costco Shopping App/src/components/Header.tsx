import { ShoppingCart, Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import starIcon from 'figma:asset/dbfb424ee46c47064690d351ff66246d9c71c576.png';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchFocus: () => void;
}

export function Header({ cartItemCount, onCartClick, searchQuery, onSearchChange, onSearchFocus }: HeaderProps) {
  return (
    <header className="bg-[#6A89A7] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ImageWithFallback 
              src={starIcon} 
              alt="Costco Star" 
              className="w-10 h-10 object-contain"
              style={{ mixBlendMode: 'lighten' }}
            />
            <h3 className="text-white text-2xl">Costco</h3>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6A89A7]" />
              <input
                type="text"
                placeholder="Explore Costco"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onSearchFocus}
                className="w-full pl-10 pr-4 py-2 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88BDF2] placeholder-[#9ca3af] transition-all"
              />
            </div>
          </div>

          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-[#88BDF2] rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E57373] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}