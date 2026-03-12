'use client';

import React from 'react';
import './styles.css';

interface ButtonProps {
  name: string;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  href,
  onClick,
  openInNewTab = false,
}) => {

  const decoration = (
    <>
      <div className="border-top-left" />
      <div className="border-top-right" />
      <div className="border-bottom-left" />
      <div className="border-bottom-right" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className="cmp-btn"
      >
        {name}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="cmp-btn"
    >
      {decoration}
      {name}
    </button>
  );
};

export default Button;
