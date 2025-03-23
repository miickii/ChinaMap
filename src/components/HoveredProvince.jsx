import React from 'react';

const Province = ({ province }) => {
  if (!province) return null;
  return (
    <div className="absolute top-16 left-1/2 translate-x-1/2 z-40 p-2 bg-gray-800 text-white rounded shadow">
      <p className="text-lg font-medium">{province.name}</p>
    </div>
  );
};

export default Province;
