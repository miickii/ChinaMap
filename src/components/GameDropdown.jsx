import React, { useState } from 'react';

const GameDropdown = ({ onSelectGameMode }) => {
  const [open, setOpen] = useState(false);
  const gameModes = ["Standard", "Timed", "Practice"];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded shadow focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        Select Game Mode
      </button>
      {open && (
        <div className="mt-2 flex flex-col bg-white border border-gray-300 rounded shadow transition-all duration-300">
          {gameModes.map((mode, idx) => (
            <button 
              key={idx}
              className="px-4 py-2 hover:bg-gray-200 text-left"
              onClick={() => {
                setOpen(false);
                if (onSelectGameMode) onSelectGameMode(mode);
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameDropdown;
