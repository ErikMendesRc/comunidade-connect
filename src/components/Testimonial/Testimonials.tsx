import React from 'react';
import useStrings from '../../hooks/useStrings';
import TestimonialCard from './TestimonialCard';

const Testimonials: React.FC = () => {
  const { testimonials } = useStrings();

  return (
    <section className="text-white bg-neutral-dark py-16">
      <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
        <h3 className="mb-6 text-3xl font-bold text-white">{testimonials.title}</h3>
        <p className="mb-6 pb-2 md:mb-12 md:pb-0 text-white">{testimonials.description}</p>
      </div>

      <div className="grid gap-6 text-center md:grid-cols-3">
        {testimonials.reviews.map((review, index) => (
          <TestimonialCard
            key={index}
            image={review.image}
            name={review.name}
            position={review.position}
            quote={review.quote}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;