import { ForwardedRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function useAnimation({
  ref: ref,
  duration: duration = 0.05,
  delay: delay = 0,
  stagger: stagger = 0.03,
}: {
  ref: ForwardedRef<HTMLParagraphElement>;
  duration?: number;
  delay?: number;
  stagger?: number;
}) {
  const [animation, setAnimation] = useState(false);

  const toggleAnimation = () => {
    setAnimation((prev) => !prev);
    if (typeof ref === "function") return;
    const target = ref?.current;
    if (!target) return;
    const text = new SplitType(target);

    if (text) {
      gsap.set(target, { opacity: 1 });
      console.log("animating");
      gsap.from(text.chars, {
        opacity: 0,
        stagger: stagger,
        duration: duration,
      });
    }
  };

  return { animation, toggleAnimation };
}
