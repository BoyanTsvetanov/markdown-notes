import React from "react";

type Props = {
  content: string;
  onChange: (value: string) => void;
};

export const MarkdownEditor: React.FC<Props> = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-[70dvh] max-md:h-60 md:flex-1/2 p-2 border rounded font-mono resize-none focus:outline-none"
      placeholder="Write your markdown here..."
    />
  );
};
