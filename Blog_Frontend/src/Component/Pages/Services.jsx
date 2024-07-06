import React from 'react';

const Services = () => {
  return (
    <div className="bg-[#F3FBFB] min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#272343] text-center mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 bg-[#BAE8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src="path/to/seo-icon.png" alt="SEO Services" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold text-[#272343] mb-2">SEO Optimization</h2>
            <p className="text-[#272343]">
              Enhance your blog's visibility on search engines with our expert SEO services.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 bg-[#BAE8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src="path/to/content-icon.png" alt="Content Creation" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold text-[#272343] mb-2">Content Creation</h2>
            <p className="text-[#272343]">
              Get high-quality, engaging content tailored to your audience and niche.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 bg-[#BAE8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src="path/to/design-icon.png" alt="Design Services" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold text-[#272343] mb-2">Design Services</h2>
            <p className="text-[#272343]">
              Create visually stunning blog designs that captivate your readers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 bg-[#BAE8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src="path/to/analytics-icon.png" alt="Analytics" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold text-[#272343] mb-2">Analytics</h2>
            <p className="text-[#272343]">
              Track your blog's performance with detailed analytics and insights.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 bg-[#BAE8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src="path/to/marketing-icon.png" alt="Marketing" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold text-[#272343] mb-2">Marketing</h2>
            <p className="text-[#272343]">
              Expand your reach with our targeted marketing strategies.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 bg-[#BAE8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
              <img src="path/to/support-icon.png" alt="Support" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold text-[#272343] mb-2">Support</h2>
            <p className="text-[#272343]">
              Get dedicated support to help you grow and manage your blog effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
