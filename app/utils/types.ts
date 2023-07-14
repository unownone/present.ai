export interface IPPT {
  topic: string;
  title: string;
  description: string;
  slides: ISlideData[];
}

export type SlideType = "Introduction" | "Body" | "Conclusion";
export interface ISlideData {
  type: SlideType;
  title: string;
  description: string;
  slide_topic: string;
  text?: string;
  image?: string;
}

export const DEFAULT_PPT = {
  topic: "",
  title: "",
  description: "",
  slides: [],
} as IPPT;
