// src/components/Breadcrumb.jsx
import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';

const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 mb-6">
      <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 flex-wrap">

          {items.map((item, index) => (
            <li key={index} className="flex items-center">

              {/* Home Icon for first item */}
              {index === 0 && (
                <IoHomeOutline className="w-4 h-4 text-green-700 mr-1" />
              )}

              {/* Link or Current */}
              {item.href ? (
                <button
                  onClick={() => window.location.href = item.href}
                  className="text-green-700 hover:text-green-900 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-green-900 font-semibold">
                  {item.label}
                </span>
              )}

              {/* Separator */}
              {index < items.length - 1 && (
                <span className="mx-2 text-green-500 font-bold">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;