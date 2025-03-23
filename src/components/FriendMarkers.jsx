import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Helper to normalize city names
const normalizeCityName = (name) => name.replace(/(市|县|区)$/, '');

const FriendMarkers = ({
  friends,
  provinceCentroids,
  cityCentroids,
  countyCentroids,
  zoomScale,
  transform,
  onFriendSelect,
}) => {
  return (
    <g transform={transform}>
      {friends.map((friend, index) => {
        let pos = null;
        // Use the city's centroid if friend.level is 'city' and friend.city is provided.
        if (friend.level === 'city' && friend.city) {
          const normalizedCity = normalizeCityName(friend.city);
          pos = cityCentroids[normalizedCity] || provinceCentroids[friend.province] || null;
        } else {
          // Otherwise, fall back to the province centroid.
          pos = provinceCentroids[friend.province] || null;
        }
        // Guard: if pos is not defined or doesn't have at least two coordinates, skip rendering.
        if (!pos || pos.length < 2) {
          return null;
        }
        return (
          <foreignObject
            key={index}
            x={pos[0] - (20 / zoomScale) / 2}
            y={pos[1] - (20 / zoomScale)}
            width={20 / zoomScale}
            height={20 / zoomScale}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (onFriendSelect) onFriendSelect(friend);
            }}
          >
            <div className="flex items-center justify-center">
              <FaMapMarkerAlt style={{ fontSize: `${20 / zoomScale}px`, color: 'red' }} />
            </div>
          </foreignObject>
        );
      })}
    </g>
  );
};

export default FriendMarkers;
