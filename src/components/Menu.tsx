import React from 'react';

interface MenuProps {
  pages: { title: string }[];
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

const Menu: React.FC<MenuProps> = ({ pages, selectedPage, onSelectPage }) => {
  return (
    <div className="w-48 border-r border-gray-200">
      <div className="p-3 font-medium border-b border-gray-200">Menu</div>
      <div className="p-2">
        <div className="space-y-1">
          {pages.map((page) => (
            <div
              key={page.title}
              onClick={() => onSelectPage(page.title)}
              className={`px-2 py-1 cursor-pointer ${
                selectedPage === page.title ? 'text-blue-600 font-bold' : 'text-gray-700'
              } hover:bg-gray-100`}
            >
              {page.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
