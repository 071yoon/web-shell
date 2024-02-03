import { ReactNode, Ref, forwardRef, useEffect } from "react";
import useAnimation from "../hooks/useAnimation";

function AnimatingParagraph(
  {
    opacity = 0,
    children,
  }: {
    opacity?: number;
    children: ReactNode;
  },
  ref: Ref<HTMLParagraphElement>
) {
  const { toggleAnimation } = useAnimation({ ref });

  useEffect(() => {
    toggleAnimation();
  }, [toggleAnimation]);

  return (
    <p ref={ref} style={{ opacity }}>
      {children}
    </p>
  );
}

export default forwardRef(AnimatingParagraph);
