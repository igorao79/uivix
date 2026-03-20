import React, { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "../../utils/cn";

export interface TypewriterTextProps {
  /** Array of strings to type through */
  words: string[];
  /** Typing speed in ms per character */
  typeSpeed?: number;
  /** Deleting speed in ms per character */
  deleteSpeed?: number;
  /** Pause before deleting in ms */
  pauseDuration?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Custom class for the text */
  className?: string;
  /** Custom class for the cursor */
  cursorClassName?: string;
  /** HTML tag to render */
  as?: React.ElementType;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 1500,
  loop = true,
  cursor = true,
  cursorChar = "|",
  className,
  cursorClassName,
  as: Tag = "span",
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find the longest word to reserve space and prevent layout shifts
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [words]
  );

  const tick = useCallback(() => {
    const currentWord = words[wordIndex] || "";

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }
  }, [text, wordIndex, isDeleting, words]);

  useEffect(() => {
    const currentWord = words[wordIndex] || "";

    if (!isDeleting && text === currentWord) {
      if (!loop && wordIndex === words.length - 1) return;
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration, loop, tick]);

  return (
    <Tag className={cn("inline-grid", className)}>
      {/* Invisible longest word to hold the width */}
      <span className="invisible col-start-1 row-start-1 whitespace-pre" aria-hidden="true">
        {longestWord}
      </span>
      {/* Visible typed text on top */}
      <span className="col-start-1 row-start-1 whitespace-pre">
        {text}
        {cursor && (
          <span
            className={cn(
              "inline-block w-[2px] h-[1em] align-middle ml-0.5 animate-[uixy-blink_1s_step-end_infinite] bg-current",
              cursorClassName
            )}
          />
        )}
      </span>
      <style>{`
        @keyframes uixy-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Tag>
  );
};

TypewriterText.displayName = "TypewriterText";
