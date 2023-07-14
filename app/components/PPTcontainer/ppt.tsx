"use client";

import { IPPT, ISlideData } from "@/app/utils/types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loading } from "../loading";
import { getFirstImage } from "@/app/utils/pexels";
import Image from "next/image";
import { Photo } from "pexels";

interface PPTElementProps {
  data: IPPT;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingMessage?: string;
  setLoadingMessage?: Dispatch<SetStateAction<string | undefined>>;
}

export const PPTElement = ({
  data,
  loading,
  setLoading,
  loadingMessage,
}: PPTElementProps) => {
  const [showEmpty, setShowEmpty] = useState<boolean>(false);

  const HandlePPTUpdates = useCallback(async () => {
    setLoading(true);
    if (data.slides.length === 0) {
      setShowEmpty(true);
    } else {
      setShowEmpty(false);
    }
    setLoading(false);
  }, [data, setLoading]);

  useEffect(() => {
    HandlePPTUpdates();
  }, [HandlePPTUpdates, data]);

  if (loading) return <Loading text={loadingMessage || "Loading..."} />;

  if (showEmpty) {
    return <EmptyPage />;
  }
  return (
    <div className="flex flex-col w-full">
      {data.slides.map((slideData, key) => (
        <div
          key={key}
          className="flex flex-row w-full items-center justify-between space-x-10 "
        >
          <div className="flex  justify-self-start ">
            <p className="text-3xl font-extralight">sl{key + 1}</p>
          </div>
          <SlideElement {...slideData} key={key} />
        </div>
      ))}
    </div>
  );
};

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">No slides to show.</h1>
      <h5>Begin by Creating your first slide.</h5>
    </div>
  );
};

const SlideElement = ({
  title,
  type,
  image,
  text,
  slide_topic,
  description,
}: ISlideData) => {
  const [imgObj, setImgObj] = useState<Photo | undefined>(undefined);

  const getImage = useCallback(async () => {
    if (image) {
      return image;
    } else {
      setImgObj(await getFirstImage(slide_topic));
    }
  }, [image, slide_topic]);

  useEffect(() => {
    getImage();
  });

  return (
    <div className="p-2 m-2 flex flex-col items-center justify-center aspect-video h-full w-full border-white border-2">
      <div className="p-4 h-full w-full bg-slate-50 text-black items-center justify-center">
        <div className="flex flex-row items-center justify-center w-1/2 h-1/2 overflow-clip">
          {imgObj && <img src={imgObj.src.original} />}
        </div>
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <h5 className="text-regular font-normal text-starts">{description}</h5>
      </div>
    </div>
  );
};
