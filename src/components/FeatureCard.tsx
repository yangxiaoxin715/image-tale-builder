
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-center">
      <div className="flex justify-center mb-3">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;
