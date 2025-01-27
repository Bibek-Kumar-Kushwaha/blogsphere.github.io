import React from 'react';
import Seo from '../../assets/Seo.png';
import ContainCreation from '../../assets/ContentCreation.png';
import DesignServices from '../../assets/DesignServices.png';
import Support from '../../assets/Support.png';
import Marketing from '../../assets/Marketing.png';
import Analytics from '../../assets/Analytics.png';

const Services = () => {
  const services = [
    {
      image: Seo,
      title: 'SEO Optimization',
      description: 'Enhance your blog\'s visibility on search engines with our expert SEO services.',
    },
    {
      image: ContainCreation,
      title: 'Content Creation',
      description: 'Get high-quality, engaging content tailored to your audience and niche.',
    },
    {
      image: DesignServices,
      title: 'Design Services',
      description: 'Create visually stunning blog designs that captivate your readers.',
    },
    {
      image: Analytics,
      title: 'Analytics',
      description: 'Track your blog\'s performance with detailed analytics and insights.',
    },
    {
      image: Marketing,
      title: 'Marketing',
      description: 'Expand your reach with our targeted marketing strategies.',
    },
    {
      image: Support,
      title: 'Support',
      description: 'Get dedicated support to help you grow and manage your blog effectively.',
    },
  ];

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-text text-center mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-background rounded-full mx-auto mb-4 flex items-center justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full  rounded-full"
                />
              </div>
              <h2 className="text-2xl font-semibold text-text mb-2">{service.title}</h2>
              <p className="text-text">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
