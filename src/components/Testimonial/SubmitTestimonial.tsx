import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const SubmitTestimonial: React.FC = () => {
  const [testimonial, setTestimonial] = useState('');
  const firestore = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Você precisa estar logado para enviar um depoimento.', {
        position: 'top-center',
        className: 'bg-red-500 text-white p-3 rounded'
      });
      return;
    }

    const newTestimonial = {
      uid: currentUser.uid,
      testimonial,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(firestore, 'testimonials'), newTestimonial);
      setTestimonial('');
      toast.success('Depoimento enviado com sucesso!', {
        position: 'top-center',
        className: 'bg-green-500 text-white p-3 rounded'
      });
    } catch (error) {
      console.error('Erro ao enviar depoimento:', error);
      toast.error('Erro ao enviar depoimento.', {
        position: 'top-center',
        className: 'bg-red-500 text-white p-3 rounded'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">Enviar Depoimento</h1>
      <p className="text-gray-300 mb-4">
        Queremos ouvir de você! Por favor, deixe seu depoimento e nos conte sobre sua experiência na plataforma Connect.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="testimonial">Seu depoimento</label>
          <textarea
            id="testimonial"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SubmitTestimonial;