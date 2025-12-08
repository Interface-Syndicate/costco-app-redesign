import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import starIcon from 'figma:asset/dbfb424ee46c47064690d351ff66246d9c71c576.png';

interface LoginProps {
  onLogin: (username: string) => void;
  onSwitchToRegister: () => void;
  onContinueAsGuest: () => void;
}

export function Login({ onLogin, onSwitchToRegister, onContinueAsGuest }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; credentials?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo credentials
  const DEMO_USERNAME = 'democustomer';
  const DEMO_PASSWORD = 'demo123';

  const validateForm = () => {
    const newErrors: { username?: string; password?: string; credentials?: string } = {};

    // Username validation
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call and validate credentials
    setTimeout(() => {
      // Check if credentials match demo credentials
      if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        onLogin(username);
      } else {
        // Show error message for incorrect credentials
        setErrors({
          credentials: 'Invalid username or password. Please use the demo credentials shown below.'
        });
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <ImageWithFallback 
              src={starIcon} 
              alt="Costco Star" 
              className="w-16 h-16 object-contain"
              style={{ mixBlendMode: 'lighten' }}
            />
            <h2 className="text-white text-5xl tracking-wide">COSTCO</h2>
          </div>
          <h1 className="text-white mb-2">Welcome Back</h1>
          <p className="text-white/90">Sign in to your Costco account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-[#384959] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username || errors.credentials) {
                    setErrors({ ...errors, username: undefined, credentials: undefined });
                  }
                }}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.username ? 'border-[#E57373]' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-[#E57373] text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#384959] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.credentials) {
                      setErrors({ ...errors, password: undefined, credentials: undefined });
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A89A7] hover:text-[#384959] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#E57373] text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#6A89A7] cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#6A89A7] focus:ring-[#88BDF2]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-[#6A89A7] hover:text-[#384959] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Credentials Error Message */}
            {errors.credentials && (
              <div className="bg-[#E57373]/10 border border-[#E57373] text-[#E57373] px-4 py-3 rounded-lg">
                <p className="text-sm">{errors.credentials}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#E8DCC2] text-[#384959] hover:bg-[#d4c8ad] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#6A89A7]">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-[#6A89A7]">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#6A89A7] hover:text-[#384959] transition-colors"
              >
                Sign up for membership
              </button>
            </p>
          </div>
        </div>

        {/* Guest Access Button */}
        <button
          onClick={onContinueAsGuest}
          className="w-full mt-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Continue as Guest
        </button>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <p className="text-white/90 text-sm mb-2">Demo Credentials</p>
          <p className="text-white text-xs">
            Username: democustomer | Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
}