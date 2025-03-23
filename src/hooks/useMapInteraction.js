import { useState, useCallback } from 'react';
import { debounce } from '../utils/helpers';

export const useMapInteraction = (initialZoom = 4, initialCenter = [35.8617, 104.1954]) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState(initialCenter);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const handleZoom = useCallback(
    debounce((newZoom) => {
      setZoom(newZoom);
    }, 150),
    []
  );

  const handleCenterChange = useCallback(
    debounce((newCenter) => {
      setCenter(newCenter);
    }, 150),
    []
  );

  const handleProvinceHover = useCallback((province) => {
    setHoveredProvince(province);
  }, []);

  const handleProvinceClick = useCallback((province) => {
    setSelectedProvince(province);
  }, []);

  const resetMap = useCallback(() => {
    setZoom(initialZoom);
    setCenter(initialCenter);
    setHoveredProvince(null);
    setSelectedProvince(null);
  }, [initialZoom, initialCenter]);

  return {
    zoom,
    center,
    hoveredProvince,
    selectedProvince,
    handleZoom,
    handleCenterChange,
    handleProvinceHover,
    handleProvinceClick,
    resetMap,
  };
}; 