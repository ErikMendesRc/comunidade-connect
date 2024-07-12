import React from 'react';

interface TestimonialCardProps {
  image: string;
  name: string;
  position: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, position, quote }) => {
  return (
    <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-center -mt-16 md:justify-end">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-white"
          src={image}
          alt={name}
        />
      </div>
      <div className="text-center md:text-left mt-4">
        <h2 className="text-xl font-medium">{name}</h2>
        <p className="text-sm text-neutral-light">{position}</p>
        <p className="mt-2 text-neutral-light">{quote}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;