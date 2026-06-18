import React, { useState, useEffect } from 'react';

const defaultWords = ['Visionary', 'Ambitious', 'Modern', 'Innovative', 'Scaling'];
const skip_delay = 15;
const speed = 70;

const TypingText = ({ words = defaultWords }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!words || words.length === 0) return;
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
  }, [words]);

  return (
    <>
      {text || '\u200B'}
      <span className="animate-pulse border-r-[4px] border-white ml-2 inline-block h-[0.9em] align-middle -translate-y-1"></span>
    </>
  );
};

export default TypingText;
