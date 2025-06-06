import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

export const Preview: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose border rounded p-4 bg-white shadow-sm overflow-x-hidden break-words font-handwriting h-[70dvh] max-md:h-60 md:flex-1/2">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
