import React, { useEffect, useState } from 'react';
import useStrings from '../hooks/useStrings';
import HighlightSection from '../components/HighlightSection';
import TestimonialCard from '../components/Testimonial/TestimonialCard';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getUserData } from '../services/firebaseService';

interface Testimonial {
  uid: string;
  testimonial: string;
  timestamp: any;
  name?: string;
  profilePicture?: string;
  role?: string;
}

const HomePage: React.FC = () => {
  const { highlightSection, testimonials } = useStrings();
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const firestore = getFirestore();
      const testimonialsCollection = collection(firestore, 'testimonials');
      const testimonialsSnapshot = await getDocs(testimonialsCollection);
      const testimonialsData = await Promise.all(
        testimonialsSnapshot.docs.map(async (doc) => {
          const testimonialData = doc.data() as Testimonial;
          const userData = await getUserData(testimonialData.uid);
          return {
            ...testimonialData,
            name: `${userData?.name || ''} ${userData?.lastName || ''}`.trim(),
            profilePicture: userData?.profilePicture || 'https://via.placeholder.com/150',
            role: userData?.role || 'Usuário',
          };
        })
      );
      setTestimonialsList(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  return (
    <div>
      <HighlightSection />
      <section className="text-neutral-700 dark:text-neutral-300 p-6">
        <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
          <h3 className="mb-6 text-3xl font-bold text-primary dark:text-neutral-300">{testimonials.title}</h3>
          <p className="mb-6 pb-2 md:mb-12 md:pb-0 text-primary dark:text-neutral-300">
            {testimonials.description}
          </p>
        </div>

        <div className="grid gap-6 text-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6 lg:px-8">
          {testimonialsList.map((review, index) => (
            <TestimonialCard
              key={index}
              image={review.profilePicture || 'https://via.placeholder.com/150'}
              name={review.name || 'Anonymous'}
              position={review.role || 'Usuário'}
              quote={review.testimonial || 'Nenhum depoimento fornecido.'}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;