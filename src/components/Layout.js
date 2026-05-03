import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#eef1f9]">
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 shadow-sm" style={{ background: 'linear-gradient(10deg, #c062c4, #eef1f9)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-10 h-10 bg-[#c062c4] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1a1a1a]">InsureX</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className="text-[#4a5568] hover:text-[#c062c4] transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/quote')}
                className="text-[#4a5568] hover:text-[#c062c4] transition-colors font-medium"
              >
                Plans
              </button>
              <button className="text-[#4a5568] hover:text-[#c062c4] transition-colors font-medium">
                Calculator
              </button>
              <button className="text-[#4a5568] hover:text-[#c062c4] transition-colors font-medium">
                Claims
              </button>
              <button className="text-[#4a5568] hover:text-[#c062c4] transition-colors font-medium">
                Contact
              </button>
            </nav>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/quote')}
              className="bg-[#c062c4] text-white px-6 py-2.5 rounded-lg hover:bg-[#b056b8] transition-colors shadow-sm"
            >
              Get Quote
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-white py-4" style={{ background: 'linear-gradient(10deg, #c062c4, #eef1f9)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} InsureX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}