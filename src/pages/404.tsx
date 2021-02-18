import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
          <Helmet>
            <title>Not Found | Uber Eats Clone</title>
          </Helmet>
          <h2 className="font-semibold text-2xl mb-3">Page not found</h2>
          <h4 className="font-medium text-lg mb-5">
            The page you are looking for does not exist or has moved
          </h4>
          <Link to="/" className="hover:underline text-lime-600">Go back home &rarr;</Link>
        </div>
    );
};
