import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { formatNumber } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

// Helper function to normalize city/province names if needed.
const normalizeName = (name) => name.replace(/(市|县|区)$/, '');

const GameMap = ({ gameSettings, onGameEnd }) => {
  const svgRef = useRef(null);
  const width = 1000;
  const height = 800;
  
  // Local game state.
  const [lives, setLives] = useState(gameSettings.lives);
  const [provincesOrder, setProvincesOrder] = useState([]);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [provinceCentroids, setProvinceCentroids] = useState({});
  
  // For "type" mode: answer input state.
  const [answer, setAnswer] = useState('');
  
  // Refs to store selections so that event handlers don't reattach on every change.
  const provincesGroupRef = useRef(null);
  const currentTargetRef = useRef(currentTargetIndex);
  useEffect(() => {
    currentTargetRef.current = currentTargetIndex;
  }, [currentTargetIndex]);
  
  const {
    zoom,
    center,
    hoveredProvince,
    selectedProvince,
    handleZoom,
    handleCenterChange,
    handleProvinceHover,
    handleProvinceClick,
    resetMap,
  } = useMapInteraction();

  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch('/china-provinces.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMapData(data);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError('Failed to load map data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);
  
  useEffect(() => {
    if (!mapData || !svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const g = svg.append('g');

    // Create projection
    const projection = d3.geoMercator()
      .fitSize([width, height], mapData);

    // Create path generator
    const path = d3.geoPath().projection(projection);

    // Draw provinces
    g.selectAll('path')
      .data(mapData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'province')
      .attr('fill', '#e2e8f0')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1)
      .on('mouseover', (event, d) => {
        handleProvinceHover(d.properties);
        d3.select(event.currentTarget)
          .attr('fill', '#bfdbfe')
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 2);
      })
      .on('mouseout', (event, d) => {
        handleProvinceHover(null);
        d3.select(event.currentTarget)
          .attr('fill', '#e2e8f0')
          .attr('stroke', '#cbd5e1')
          .attr('stroke-width', 1);
      })
      .on('click', (event, d) => {
        handleProvinceClick(d.properties);
      });

    // Add zoom behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        handleZoom(event.transform.k);
        handleCenterChange([event.transform.x, event.transform.y]);
      });

    svg.call(zoomBehavior);

    // Add reset button
    const resetButton = d3.select(svgRef.current.parentNode)
      .append('button')
      .attr('class', 'button button-secondary absolute top-4 right-4')
      .text('Reset View')
      .on('click', () => {
        svg.transition()
          .duration(750)
          .call(zoomBehavior.transform, d3.zoomIdentity);
        resetMap();
      });

  }, [mapData, handleZoom, handleCenterChange, handleProvinceHover, handleProvinceClick, resetMap]);
  
  // Draw the map only once.
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .style('overflow', 'visible');
    
    // Create a dedicated D3 container.
    let container = svg.select('.d3-container');
    if (container.empty()) {
      container = svg.append('g').attr('class', 'd3-container');
    }
    container.selectAll('*').remove();
    
    // Create a group for provinces and store it in a ref.
    const provincesGroup = container.append('g').attr('class', 'provinces');
    provincesGroupRef.current = provincesGroup;
    
    // Set up a Mercator projection and path generator.
    const projection = d3.geoMercator()
      .center([105, 38])
      .scale(800)
      .translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);
    
    // Load the province GeoJSON.
    d3.json('/china.json').then((geoData) => {
      if (!geoData || !geoData.features) {
        console.error('No GeoJSON data found.');
        return;
      }
      
      // Optionally filter out unwanted provinces (e.g., 澳门).
      const features = geoData.features.filter(d => d.properties.name !== "澳门");
      
      // Shuffle provinces to create a random order.
      const shuffled = features.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setProvincesOrder(shuffled);
      setCurrentTargetIndex(0); // start at the first province in the shuffled order
      
      // Draw provinces (all are drawn once).
      provincesGroup.selectAll('path.province')
        .data(geoData.features)
        .enter()
        .append('path')
        .attr('class', d => `province province-${d.properties.id}`)
        .attr('d', pathGenerator)
        .attr('stroke', '#333')
        .attr('fill', '#ccc')
        .on('click', function(event, d) {
          if (gameOver) return;
          // In select mode, use click interaction; in type mode, clicks are ignored.
          if (gameSettings.mode === 'select') {
            event.preventDefault();
            event.stopPropagation();
            const targetProvince = shuffled[currentTargetRef.current].properties.name;
            const isCorrect = d.properties.name === targetProvince;
            if (isCorrect) {
              d3.select(this).attr('fill', 'green');
              if (currentTargetRef.current + 1 < shuffled.length) {
                setCurrentTargetIndex(prev => prev + 1);
              } else {
                setGameOver(true);
                onGameEnd && onGameEnd({ result: 'win', remainingLives: lives });
              }
            } else {
              d3.select(this)
                .attr('fill', 'red')
                .transition().duration(1500)
                .attr('fill', '#ccc');
              setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                  setGameOver(true);
                  onGameEnd && onGameEnd({ result: 'lose', remainingLives: newLives });
                }
                return newLives;
              });
            }
          }
        });
      
      // Compute province centroids once.
      const centroids = {};
      geoData.features.forEach((d) => {
        const centroid = pathGenerator.centroid(d);
        centroids[d.properties.name] = centroid;
      });
      setProvinceCentroids(centroids);
      
      // In "type" mode, immediately highlight the target province.
      if (gameSettings.mode === 'type' && shuffled.length > 0) {
        provincesGroup.selectAll('path.province')
          .filter(d => d.properties.name === shuffled[0].properties.name)
          .attr('fill', 'lightgreen');
      }
    }).catch((error) => {
      console.error('Error loading provinces GeoJSON:', error);
    });
    
    // No zoom/pan behavior in game mode.
  }, [gameSettings.mode, gameOver, onGameEnd]);
  
  // Effect to update the highlight for the current target province in type mode.
  useEffect(() => {
    if (gameSettings.mode === 'type' && provincesGroupRef.current && provincesOrder.length > 0) {
      const targetProvince = provincesOrder[currentTargetIndex].properties.name;
      // Reset all provinces that are not permanently marked.
      provincesGroupRef.current.selectAll('path.province')
        .attr('fill', function(d) {
          // Leave provinces that are already green (correct answers).
          const currentFill = d3.select(this).attr('fill');
          return currentFill === 'green' ? 'green' : '#ccc';
        });
      // Highlight the target province.
      provincesGroupRef.current.selectAll('path.province')
        .filter(d => d.properties.name === targetProvince)
        .attr('fill', 'lightgreen');
    }
  }, [currentTargetIndex, gameSettings.mode, provincesOrder]);
  
  // Handler for the input submission in "type" mode.
  const handleInputSubmit = (e) => {
    if (e.key === 'Enter' && !gameOver) {
      const submitted = e.target.value.trim();
      const targetProvince = provincesOrder[currentTargetIndex]
        ? provincesOrder[currentTargetIndex].properties.name
        : '';
      const isCorrect = submitted === targetProvince;
      
      // Select the target province element.
      const svg = d3.select(svgRef.current);
      const provincesGroup = svg.select('.d3-container').select('g.provinces');
      if (isCorrect) {
        provincesGroup.selectAll('path.province')
          .filter(d => d.properties.name === targetProvince)
          .attr('fill', 'green');
        if (currentTargetIndex + 1 < provincesOrder.length) {
          setCurrentTargetIndex(prev => prev + 1);
        } else {
          setGameOver(true);
          onGameEnd && onGameEnd({ result: 'win', remainingLives: lives });
        }
      } else {
        provincesGroup.selectAll('path.province')
          .filter(d => d.properties.name === targetProvince)
          .attr('fill', 'red')
          .transition().duration(1500)
          .attr('fill', '#ccc');
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameOver(true);
            onGameEnd && onGameEnd({ result: 'lose', remainingLives: newLives });
          }
          return newLives;
        });
      }
      setAnswer('');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="button button-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-white rounded-xl overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      />
      <AnimatePresence>
        {hoveredProvince && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10"
          >
            <h3 className="text-lg font-semibold text-gray-900">{hoveredProvince.name}</h3>
            <p className="text-sm text-gray-600">Population: {formatNumber(hoveredProvince.population)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameMap;
