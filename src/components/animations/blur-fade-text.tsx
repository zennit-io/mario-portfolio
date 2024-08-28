"use client";

import {cn} from "@/utils";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {useMemo} from "react";

type BlurFadeTextProps = {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
};
export const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <div className="flex">
        <AnimatePresence>
          {characters.map((character, i) => (
            <motion.span
              // biome-ignore lint/suspicious/noArrayIndexKey: no better value to use here
              key={`${character}-${i}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                yoyo: Number.POSITIVE_INFINITY,
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className={cn("inline-block", className)}
              style={{ width: character.trim() === "" ? "0.2em" : "auto" }}
            >
              {character}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex">
      <AnimatePresence>
        <motion.span
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={combinedVariants}
          transition={{
            yoyo: Number.POSITIVE_INFINITY,
            delay,
            ease: "easeOut",
          }}
          className={cn("inline-block", className)}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
