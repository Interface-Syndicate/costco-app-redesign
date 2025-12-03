import { X } from 'lucide-react';

interface GuestPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

export function GuestPrompt({ isOpen, onClose, onLogin, onSignup }: GuestPromptProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 m-4 max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6A89A7] hover:text-[#384959] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#88BDF2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#6A89A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-[#384959] text-2xl mb-2">Sign In Required</h3>
          <p className="text-[#6A89A7]">
            Please sign in or create an account to add items to your cart and enjoy full shopping features.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full py-3 bg-[#6A89A7] text-white rounded-lg hover:bg-[#5a7797] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
          <button
            onClick={onSignup}
            className="w-full py-3 bg-[#E8DCC2] text-[#384959] rounded-lg hover:bg-[#d4c8ad] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-[#6A89A7] rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}