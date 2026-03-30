import React, { useState, useEffect } from 'react';

const words = ['Visionary', 'Ambitious', 'Modern', 'Innovative', 'Scaling'];
const skip_delay = 15;
const speed = 70;

const TypingText = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    let i = 0;
    let offset = 0;
    let forwards = true;
    let skip_count = 0;

    const intervalId = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count === skip_delay) { // Delay before backspacing
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset === 0) { // Delay before typing next word is naturally 0, move to next
          forwards = true;
          i++;
          offset = 0;
          if (i >= words.length) {
            i = 0;
          }
        }
      }

      const part = words[i].substr(0, offset);

      if (skip_count === 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }

      setText(part);
    }, speed);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {text}
      <span className="animate-pulse border-r-[4px] border-slate-900 ml-2 inline-block h-[0.9em] align-middle -translate-y-1"></span>
    </>
  );
};

export default TypingText;
