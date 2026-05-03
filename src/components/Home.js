import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, Zap, DollarSign, HeadphonesIcon } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section - Split Layout */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Illustration */}
            <div className="order-2 md:order-1">
              <ImageWithFallback
                src="/images/homeimage.jpg"
                alt="Vehicle Insurance Illustration"
                style={{
                  width: '700px',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                }}
              />
            </div>

            {/* Right Side - Content */}
            <div className="order-1 md:order-2">
              <h1 className="text-5xl font-bold text-[#1a1a1a] mb-4 leading-tight">
                Smart Vehicle Insurance Made Simple
              </h1>
              <p className="text-lg text-[#64748b] mb-8 leading-relaxed">
                Get instant premium calculations and secure coverage for your vehicles. 
                Comprehensive protection with transparent pricing and hassle-free claims.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/quote')}
                  className="bg-[#c062c4] text-white px-8 py-3.5 rounded-xl hover:bg-[#b056b8] transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  Calculate Premium
                </button>
                <button className="bg-white text-[#c062c4] px-8 py-3.5 rounded-xl border-2 border-[#c062c4] hover:bg-[#f8f5fc] transition-all font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 bg-[#eef1f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#1a1a1a] mb-4">
            Why Choose Us
          </h2>
          <p className="text-center text-[#64748b] mb-12 max-w-2xl mx-auto">
            Experience the difference with our comprehensive insurance solutions and customer-first approach
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Shield */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#f0e7f7] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#c062c4]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                Comprehensive Coverage
              </h3>
              <p className="text-[#64748b] leading-relaxed">
                Full protection for all your vehicles with customizable plans tailored to your needs
              </p>
            </div>

            {/* Card 2 - Speed */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#fff4e6] rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-[#ff9800]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                Instant Quotes
              </h3>
              <p className="text-[#64748b] leading-relaxed">
                Get premium calculations in seconds with our advanced calculator and pricing engine
              </p>
            </div>

            {/* Card 3 - Savings */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#e8f5e9] rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-7 h-7 text-[#4caf50]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                Best Rates
              </h3>
              <p className="text-[#64748b] leading-relaxed">
                Competitive pricing with transparent breakdowns and flexible payment options
              </p>
            </div>

            {/* Card 4 - Support */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#e3f2fd] rounded-xl flex items-center justify-center mb-4">
                <HeadphonesIcon className="w-7 h-7 text-[#2196f3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                24/7 Support
              </h3>
              <p className="text-[#64748b] leading-relaxed">
                Dedicated team ready to assist with claims processing and expert guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Section 1 - Our Insurance Plans */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#1a1a1a] mb-4">
            Our Insurance Plans
          </h2>
          <p className="text-center text-[#64748b] mb-12 max-w-2xl mx-auto">
            Choose from a variety of coverage options designed for your specific needs
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder Cards */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#f8f9fa] rounded-2xl p-8 border-2 border-dashed border-[#dee2e6]">
                <div className="h-48 bg-[#e9ecef] rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-[#adb5bd] font-medium">Plan {item}</span>
                </div>
                <div className="h-6 bg-[#e9ecef] rounded-lg mb-3 w-3/4"></div>
                <div className="h-4 bg-[#e9ecef] rounded-lg mb-2"></div>
                <div className="h-4 bg-[#e9ecef] rounded-lg w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Section 2 - Customer Testimonials */}
      <section className="py-10 bg-[#eef1f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#1a1a1a] mb-4">
            Customer Testimonials
          </h2>
          <p className="text-center text-[#64748b] mb-12 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with InsureX
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder Cards */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#e9ecef] rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#e9ecef] rounded-lg mb-2 w-2/3"></div>
                    <div className="h-3 bg-[#e9ecef] rounded-lg w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-[#e9ecef] rounded-lg"></div>
                  <div className="h-4 bg-[#e9ecef] rounded-lg"></div>
                  <div className="h-4 bg-[#e9ecef] rounded-lg w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}