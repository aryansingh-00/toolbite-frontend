import React, { useState, useEffect } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const MagicStar = () => {
  const style = {
    '--star-left': `${rand(-10, 100)}%`,
    '--star-top': `${rand(-40, 80)}%`
  };

  return (
    <span className="magic-star" style={style}>
      <svg viewBox="0 0 512 512">
        <path fill="var(--lavender)" d="M512 255.1c0 11.34-7.406 20.82-18.44 23.61l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
      </svg>
    </span>
  );
}

const MagicText = ({ children }) => {
  const [stars, setStars] = useState([0, 1, 2]);

  useEffect(() => {
    let index = 3;
    const interval = setInterval(() => {
      setStars(current => {
        const next = [...current];
        next.shift();
        next.push(index++);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="magic">
      {stars.map(key => (
        <MagicStar key={key} />
      ))}
      <span className="magic-text">{children}</span>
    </span>
  );
};

export default MagicText;
