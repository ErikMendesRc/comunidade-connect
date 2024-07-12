import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-neutral-dark py-12">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 flex flex-col items-center mb-8 lg:mb-0">
          <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-xs lg:max-w-md h-auto">
            <img src="/founder.png" alt="Founder" className="w-full h-auto object-cover"/>
          </div>
          <p className="text-white text-sm mt-2 text-center">Fundador da Connect: Guilherme Arebalo</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://www.linkedin.com/in/guilherme-arebalo-607112236/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
              <FaLinkedin size={30} />
            </a>
            <a href="https://www.instagram.com/arebaloguilherme/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 text-left max-w-3xl mx-auto text-white">
          <h1 className="text-white text-4xl font-bold mb-8 text-center lg:text-left">Sobre Nós</h1>
          <p className="text-lg leading-relaxed mb-8">
            A comunidade Connect foi fundada em 2021 com a missão de unir empresários em busca de aperfeiçoamento e oportunidades de networking. 
            Os valores fundamentais da comunidade Connect incluem colaboração, aprendizado contínuo, inovação e apoio mútuo entre os membros.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Sob a liderança visionária de Guilherme Arebalo, um empresário experiente no mercado digital, a comunidade Connect se destaca por promover 
            a excelência pessoal e profissional. Guilherme Arebalo é conhecido por sua expertise em marketing e vendas, tendo ajudado mais de 100 empresas 
            com sua assessoria. Além disso, ele gerencia uma loja física de perfumes importados e já impactou mais de 4 mil pessoas em todo o mundo com seus 
            infoprodutos.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Como líder fundador, Guilherme Arebalo é apaixonado por autaperformance e busca inspirar outros a atingir sua melhor versão, incentivando o crescimento 
            pessoal e profissional de todos os membros da comunidade Connect. Juntos, os membros compartilham conhecimentos, experiências e oportunidades, fortalecendo 
            assim seus negócios e ampliando suas redes de contatos.
          </p>
          <h2 className="text-3xl font-semibold mb-4">Nossa Missão</h2>
          <p className="text-lg leading-relaxed mb-8">
            Nossa missão é proporcionar uma plataforma conectiva que facilita a comunicação e a colaboração entre profissionais de diversas áreas. Estamos comprometidos 
            em criar um ambiente inclusivo e inovador que promove o crescimento e o sucesso de todos os nossos usuários.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;