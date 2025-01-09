import React, { useState } from "react";
import documentationJson from "../documentation.json";
import "../index.css";

const DocumentViewer = () => {
  const [documentation] = useState(documentationJson);
  const [selectedPage, setSelectedPage] = useState(
    documentation.Pages[0]?.title || ""
  );

  const handlePageChange = (pageTitle: string) => {
    setSelectedPage(pageTitle);
  };

  const currentPage = documentation.Pages.find(
    (page) => page.title === selectedPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Browser-like Header */}
      <div className="border-b border-gray-300 bg-gray-50">
        <div className="flex items-center p-2 space-x-2">
          {/* Browser Buttons */}
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {/* URL Input */}
          <div className="flex-1 px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded">
            http://localhost:8080/{selectedPage}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <div className="w-60 bg-white border-r border-gray-300">
          <div className="px-4 py-2 font-semibold border-b border-gray-300">
            Menu
          </div>
          <div className="flex flex-col space-y-1 p-2">
            {documentation.Pages.map((page) => (
              <div
                key={page.title}
                onClick={() => handlePageChange(page.title)}
                className={`px-2 py-2 text-sm cursor-pointer rounded hover:bg-gray-200 ${
                  selectedPage === page.title
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {page.title}
              </div>
            ))}
          </div>
          {/* Export Button */}
          <div className="p-4">
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
              Export
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {currentPage ? (
            <div className="p-6">
              <h1 className="mb-4 text-xl font-bold">{currentPage.title}</h1>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentPage.bodyText }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a page to view content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
