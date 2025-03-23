import React from 'react';

const UI = ({ selectedProvince, hoveredProvince }) => {
  // If no province is hovered or selected, we can still render the container (or render nothing)
  return (
    // A container that covers the viewport and does not block mouse events.
    <div className="fixed inset-0 pointer-events-none z-50">
      
      {/* Detailed Modal: Appears in the top-left when a province is clicked/selected */}
      {selectedProvince && (
        <div className="absolute top-4 left-4 pointer-events-auto p-4 bg-black bg-opacity-80 border border-gray-300 rounded shadow text-white">
          <h3 className="text-xl font-bold">{selectedProvince.name}</h3>
          <p className="text-lg">{selectedProvince.en_name}</p>
          {/* You can add more detailed information here */}
        </div>
      )}

      {/* Hover Modal: Appears in the top-center when a province is hovered (and nothing is selected) */}
      {hoveredProvince && (
        <div className='relative flex justify-center items-center pointer-events-none'>
          <div className="p-2 bg-gray-800 bg-opacity-90 border border-gray-300 rounded shadow text-white w-auto">
            <p className="text-lg font-semibold">{hoveredProvince.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UI;
