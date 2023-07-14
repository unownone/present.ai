import { useLottie } from "lottie-react";
import WritingAnimation from "@/public/lottie/writing.json";

interface LoadingProps {
  text?: string;
}

export const Loading = ({ text = "Loading..." }: LoadingProps) => {
  const options = {
    animationData: WritingAnimation,
    loop: true,
  };
  const { View: WritingAnim } = useLottie(options);

  return (
    <div className="flex flex-col items-center justify-center transition-all duration-300 easy">
      {WritingAnim}
      <p className="text-xl font-regular tracking-widest">{text}</p>
    </div>
  );
};
