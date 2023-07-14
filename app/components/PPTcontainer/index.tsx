"use client";
import { DEFAULT_PPT, IPPT } from "@/app/utils/types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  MdOutlineNotStarted,
  MdOutlinePauseCircleOutline,
} from "react-icons/md";

import { PPTElement } from "./ppt";
import { classNames } from "@/app/utils/tailwind";

export default function PPTContainer({
  loading,
  setLoading,
  loadingMessage,
  setLoadingMessage,
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingMessage?: string;
  setLoadingMessage?: Dispatch<SetStateAction<string | undefined>>;
}) {
  const [PPTData, setPPTData] = useState<IPPT>(DEFAULT_PPT);

  useEffect(() => {});

  return (
    <>
      <PPTDataForm
        setPPTData={setPPTData}
        loading={loading}
        setLoading={setLoading}
        setLoadingMessage={setLoadingMessage}
      />
      <div className="m-auto">
        <PPTElement
          data={PPTData}
          loading={loading}
          setLoading={setLoading}
          loadingMessage={loadingMessage}
          setLoadingMessage={setLoadingMessage}
        />
      </div>
    </>
  );
}

interface PPTDataFormProps {
  setPPTData: Dispatch<SetStateAction<IPPT>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingMessage?: Dispatch<SetStateAction<string | undefined>>;
}

const PPTDataForm = ({
  setPPTData,
  loading,
  setLoading,
  setLoadingMessage,
}: PPTDataFormProps) => {
  const [promptText, setPromptText] = useState("");
  const setData = useCallback(async () => {
    console.log(promptText);
    try {
      if (loading) return;
      if (promptText === "") {
        alert("Please enter a prompt.");
        return;
      }

      setLoading(true);
      const url = new URL(window.location.origin + "/api/generate/slides");
      url.searchParams.set("topic", encodeURIComponent(promptText));
      // console.log(url);
      const response: IPPT = await fetch(url).then((res) => res.json());
      setPPTData(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);

      setPromptText("");
    }
  }, [loading, promptText, setPPTData, setLoading]);

  return (
    <div className="flex flex-col border-b-2 border-white w-full pb-5 transition-width duration-300 easy">
      <div className="flex flex-row justify-center">
        <textarea
          className={classNames(
            "bg-gray-900 resize-none rounded-lg p-2 text-center m-2 w-2/5 align-items-center",
            loading ? "opacity-50" : "",
            "transition-width duration-300 easy"
          )}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder={"Enter your topic"}
          disabled={loading}
          value={promptText}
        />
        <button
          onClick={setData}
          className="transition-width duration-300 easy"
        >
          {loading ? (
            <MdOutlinePauseCircleOutline size={40} />
          ) : (
            <MdOutlineNotStarted size={40} />
          )}
        </button>
      </div>
    </div>
  );
};
