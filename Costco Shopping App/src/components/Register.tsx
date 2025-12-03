import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, BadgeCheck, Gift } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import costcoLogo from 'figma:asset/3a30167e6b33385dd284fe7eb6a69e5e7cc329af.png';

interface RegisterProps {
  onRegister: (username: string, membership: 'gold' | 'executive', name: string, email: string, phone: string) => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    membership: 'gold' as 'gold' | 'executive'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      username?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    // Simulate API call
    setTimeout(() => {
      onRegister(formData.username, formData.membership, formData.name, formData.email, formData.phone);
      setIsSubmitting(false);
    }, 800);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6A89A7] to-[#88BDF2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full mb-4 shadow-lg p-4">
            <ImageWithFallback src={costcoLogo} alt="Costco Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-white mb-2">Costco Membership</h1>
          <p className="text-white/90">Create your account</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-[#384959] mb-2">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pl-11`}
                  placeholder="Enter your name"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6A89A7]" />
              </div>
              {errors.name && (
                <p className="text-[#E57373] text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-[#384959] mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => updateField('username', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.username ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pl-11`}
                  placeholder="Choose a username"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6A89A7]" />
              </div>
              {errors.username && (
                <p className="text-[#E57373] text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#384959] mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pl-11`}
                  placeholder="your.email@example.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6A89A7]" />
              </div>
              {errors.email && (
                <p className="text-[#E57373] text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-[#384959] mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pl-11`}
                  placeholder="(555) 123-4567"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6A89A7]" />
              </div>
              {errors.phone && (
                <p className="text-[#E57373] text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Membership Selection */}
            <div>
              <label className="block text-[#384959] mb-3">
                Select Membership Type
              </label>
              <div className="space-y-3">
                {/* Gold Star Membership */}
                <div
                  onClick={() => setFormData({ ...formData, membership: 'gold' })}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.membership === 'gold'
                      ? 'border-[#6A89A7] bg-[#BDDDFC]/10'
                      : 'border-gray-200 hover:border-[#6A89A7]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      formData.membership === 'gold' ? 'border-[#6A89A7]' : 'border-gray-300'
                    }`}>
                      {formData.membership === 'gold' && (
                        <div className="w-3 h-3 rounded-full bg-[#6A89A7]"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <BadgeCheck className="w-5 h-5 text-[#6A89A7]" />
                        <h4 className="text-[#384959]">Gold Star Membership</h4>
                      </div>
                      <p className="text-sm text-[#6A89A7] mb-2">
                        Standard membership with full warehouse access and exclusive deals
                      </p>
                      <p className="text-[#384959]">$60/year</p>
                    </div>
                  </div>
                </div>

                {/* Executive Membership */}
                <div
                  onClick={() => setFormData({ ...formData, membership: 'executive' })}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.membership === 'executive'
                      ? 'border-[#6A89A7] bg-[#BDDDFC]/10'
                      : 'border-gray-200 hover:border-[#6A89A7]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      formData.membership === 'executive' ? 'border-[#6A89A7]' : 'border-gray-300'
                    }`}>
                      {formData.membership === 'executive' && (
                        <div className="w-3 h-3 rounded-full bg-[#6A89A7]"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Gift className="w-5 h-5 text-[#6A89A7]" />
                        <h4 className="text-[#384959]">Executive Membership</h4>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Recommended</span>
                      </div>
                      <p className="text-sm text-[#6A89A7] mb-2">
                        Premium membership with 2% annual reward on eligible purchases, plus all Gold Star benefits
                      </p>
                      <p className="text-[#384959]">$120/year</p>
                    </div>
                  </div>
                </div>
              </div>
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
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pr-12`}
                  placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[#384959] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword ? 'border-[#E57373]' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#88BDF2] transition-all pr-12`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A89A7] hover:text-[#384959] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#E57373] text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-gray-300 text-[#6A89A7] focus:ring-[#88BDF2]"
                required
              />
              <label htmlFor="terms" className="text-[#6A89A7]">
                I agree to the{' '}
                <button type="button" className="text-[#6A89A7] hover:text-[#384959] transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-[#6A89A7] hover:text-[#384959] transition-colors">
                  Privacy Policy
                </button>
              </label>
            </div>

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
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
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

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-[#6A89A7]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#6A89A7] hover:text-[#384959] transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-white/90 text-sm text-center mb-2">Membership Benefits</p>
          <div className="text-white text-xs text-center space-y-1">
            <p>✓ Exclusive member-only deals</p>
            <p>✓ 2% cashback rewards</p>
            <p>✓ Free shipping on select items</p>
          </div>
        </div>
      </div>
    </div>
  );
}