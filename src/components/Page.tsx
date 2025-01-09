import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { saveAs } from "file-saver";

interface PageProps {
  documentation: any;
  selectedPage: string;
  setDocumentation: (doc: any) => void;
}

const Page: React.FC<PageProps> = ({
  documentation,
  selectedPage,
  setDocumentation,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(selectedPage);
  const [bodyText, setBodyText] = useState(
    documentation.Pages.find((page: any) => page.title === selectedPage)
      ?.bodyText || ""
  );

  const handleCompleteEdit = () => {
    const updatedPages = documentation.Pages.map((page: any) =>
      page.title === selectedPage ? { ...page, title, bodyText } : page
    );
    setDocumentation({ ...documentation, Pages: updatedPages });
    setIsEditing(false);
  };

  const exportDocumentation = () => {
    const blob = new Blob([JSON.stringify(documentation, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "documentation.json");
  };

  return (
    <div className="p-6">
      {/* Page Title and Edit Button */}
      <div className="flex items-center justify-between mb-6">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-1 text-lg font-medium text-gray-700 border rounded"
          />
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleCompleteEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={exportDocumentation}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* Page Content */}
      {isEditing ? (
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          rows={15}
          className="w-full p-3 text-gray-700 border rounded"
        ></textarea>
      ) : (
        <div className="prose max-w-none">
          <ReactMarkdown>{bodyText}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Page;
