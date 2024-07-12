// src/components/Breadcrumbs.tsx

import React from 'react';
import { Link, useLocation, matchRoutes } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  // Definir as rotas manualmente para acessar os atributos de `breadcrumb`
  const routes = [
    { path: '/', breadcrumb: 'Home' },
    { path: '/register', breadcrumb: 'Registro' },
    { path: '/login', breadcrumb: 'Login' },
    { path: '/profile', breadcrumb: 'Meu Perfil' },
    { path: '/edit-profile', breadcrumb: 'Editar Perfil' },
    { path: '/members', breadcrumb: 'Membros' },
    { path: '/profile/:uid', breadcrumb: 'Perfil do Membro' },
    { path: '/message/:chatId', breadcrumb: 'Chat' },
    { path: '/messages', breadcrumb: 'Menssagens' },
    { path: '/about-us', breadcrumb: 'Sobre Nós' },
    { path: '/contact-us', breadcrumb: 'Entre em Contato' },
  ];

  const matches = matchRoutes(routes, location);

  if (!matches) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        {matches.map(({ route }, index) => (
          <li key={route.path} className="flex items-center">
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <Link
              to={route.path}
              className={`block transition hover:text-gray-700 ${index === matches.length - 1 ? 'font-semibold text-gray-700' : ''}`}
            >
              {route.breadcrumb}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;