'use client';

import React from 'react';

interface TeaserProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  description?: string;
  variant?: 'overlay' | 'top' | 'left' | 'right' | 'bottom' | 'full-width' | 'rectangle';
}

const Teaser: React.FC<TeaserProps> = ({
  backgroundImage,
  title,
  subtitle,
  description,
  variant = 'rectangle',
}) => {
  const textContent = (
    <div className="flex flex-col gap-3 p-6">
      {subtitle && (
        <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="text-base text-gray-700 leading-relaxed">{description}</p>
      )}
    </div>
  );

  const imageElement = (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
  );

  if (variant === 'overlay') {
    return (
      <div className="relative w-full h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 h-full flex flex-col justify-center p-8">
          {subtitle && (
            <span className="text-sm font-semibold uppercase tracking-wide text-white mb-2">
              {subtitle}
            </span>
          )}
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-white leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'top') {
    return (
      <div className="w-full flex flex-col">
        <div
          className="w-full h-[300px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {textContent}
      </div>
    );
  }

  if (variant === 'bottom') {
    return (
      <div className="w-full flex flex-col">
        {textContent}
        <div
          className="w-full h-[300px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>
    );
  }

  if (variant === 'left') {
    return (
      <div className="w-full flex flex-row">
        <div
          className="w-1/2 min-h-[300px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="w-1/2 flex items-center">{textContent}</div>
      </div>
    );
  }

  if (variant === 'right') {
    return (
      <div className="w-full flex flex-row">
        <div className="w-1/2 flex items-center">{textContent}</div>
        <div
          className="w-1/2 min-h-[300px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>
    );
  }

  if (variant === 'full-width') {
    return (
      <div className="relative w-full min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 py-16 max-w-7xl">
          {subtitle && (
            <span className="text-base font-semibold uppercase tracking-wider text-white mb-3">
              {subtitle}
            </span>
          )}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-white leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'rectangle') {
    return (
      <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col">
          <div
            className="w-full h-[250px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="bg-white">{textContent}</div>
        </div>
      </div>
    );
  }

  return null;
};

export default Teaser;
