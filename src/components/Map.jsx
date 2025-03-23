import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FriendMarkers from './FriendMarkers';

// A helper function that removes common Chinese administrative suffixes.
const normalizeCityName = (name) => {
    return name.replace(/(市|县|区)$/,'');
};

const cityIds = ['630100.json', '620100.json', '130500.json', '152900.json', '370300.json', '360300.json', '130900.json', '522200.json', '654200.json', '152500.json', '652100.json', '429000.json', '361100.json', '371100.json', '632500.json', '231000.json', '542600.json', '411100.json', '530600.json', '140100.json', '150100.json', '640500.json', '220200.json', '622900.json', '230200.json', '410300.json', '320400.json', '330400.json', '510500.json', '445100.json', '210100.json', '442000.json', '511700.json', '510900.json', '330800.json', '320800.json', '431200.json', '421200.json', '211300.json', '441600.json', '611000.json', '440800.json', '450800.json', '341200.json', '450400.json', '513300.json', '440400.json', '422800.json', '610200.json', '211100.json', '431000.json', '421000.json', '511500.json', '511900.json', '210300.json', '420200.json', '430200.json', '445300.json', '510700.json', '320600.json', '330600.json', '441800.json', '350200.json', '340200.json', '450600.json', '440600.json', '341000.json', '441400.json', '451400.json', '652300.json', '222400.json', '371300.json', '654000.json', '621100.json', '653100.json', '130700.json', '370100.json', '360100.json', '620300.json', '410100.json', '520400.json', '530400.json', '140300.json', '150300.json', '530800.json', '411300.json', '542400.json', '231200.json', '632700.json', '141100.json', '610800.json', '451000.json', '350600.json', '340600.json', '610400.json', '820000.json', '341800.json', '450200.json', '440200.json', '210700.json', '420600.json', '430600.json', '510300.json', '320200.json', '330200.json', '511100.json', '331000.json', '321000.json', '411700.json', '230800.json', '220800.json', '632300.json', '410900.json', '410500.json', '220400.json', '230400.json', '640300.json', '140700.json', '150700.json', '310100.json', '370500.json', '360500.json', '130300.json', '532800.json', '620700.json', '460100.json', '371700.json', '652700.json', '131100.json', '360900.json', '370900.json', '522400.json', '140500.json', '150500.json', '520200.json', '220600.json', '230600.json', '410700.json', '640100.json', '650100.json', '632100.json', '150900.json', '542200.json', '411500.json', '140900.json', '532600.json', '522600.json', '620900.json', '371500.json', '810100.json', '620500.json', '652900.json', '460300.json', '533400.json', '370700.json', '360700.json', '130100.json', '120100.json', '710000.json', '610600.json', '350400.json', '340400.json', '340800.json', '350800.json', '441200.json', '451200.json', '341600.json', '210900.json', '430800.json', '420800.json', '321200.json', '511300.json', '500100.json', '510100.json', '430400.json', '210500.json', '341300.json', '450900.json', '440900.json', '512000.json', '441700.json', '340100.json', '350100.json', '610300.json', '513200.json', '440500.json', '450500.json', '430100.json', '420100.json', '330500.json', '320500.json', '510400.json', '421300.json', '431300.json', '211200.json', '510800.json', '320900.json', '330900.json', '511600.json', '231100.json', '411000.json', '230300.json', '220300.json', '632800.json', '410200.json', '640400.json', '530700.json', '360200.json', '370200.json', '130400.json', '653200.json', '533100.json', '371000.json', '361000.json', '232700.json', '654300.json', '621200.json', '130800.json', '522300.json', '532300.json', '150200.json', '140200.json', '530500.json', '230100.json', '220100.json', '632600.json', '141000.json', '411200.json', '542500.json', '530900.json', '621000.json', '371200.json', '652200.json', '620200.json', '533300.json', '540100.json', '653000.json', '130600.json', '610100.json', '440700.json', '450700.json', '340300.json', '350300.json', '441900.json', '441500.json', '341100.json', '511400.json', '211000.json', '421100.json', '431100.json', '510600.json', '330700.json', '320700.json', '210200.json', '430300.json', '445200.json', '420300.json', '511800.json', '620600.json', '532900.json', '130200.json', '360400.json', '370400.json', '532500.json', '152200.json', '370800.json', '360800.json', '131000.json', '371600.json', '632200.json', '230900.json', '410800.json', '411600.json', '542100.json', '530100.json', '520100.json', '623000.json', '150600.json', '140600.json', '650200.json', '640200.json', '410400.json', '230500.json', '220500.json', '330300.json', '320300.json', '210600.json', '430700.json', '420700.json', '469000.json', '511000.json', '321100.json', '331100.json', '211400.json', '451100.json', '610900.json', '341500.json', '440300.json', '513400.json', '450300.json', '610500.json', '110100.json', '433100.json', '340700.json', '350700.json', '321300.json', '210800.json', '420900.json', '430900.json', '430500.json', '420500.json', '210400.json', '330100.json', '320100.json', '340500.json', '350500.json', '440100.json', '450100.json', '610700.json', '659000.json', '341700.json', '451300.json', '441300.json', '350900.json', '371400.json', '620800.json', '522700.json', '360600.json', '370600.json', '652800.json', '460200.json', '620400.json', '230700.json', '220700.json', '410600.json', '530300.json', '520300.json', '310200.json', '150400.json', '140400.json', '140800.json', '150800.json', '542300.json', '411400.json']

const ChinaMap = ({ onProvinceHover, onProvinceSelect, onFriendDataUpdate, onFriendSelect }) => {
  const svgRef = useRef(null);
  const width = 1000;
  const height = 800;
  const zoomThreshold = 2;

  // State for friend data.
  const [friends, setFriends] = useState([]);

  // State for the current zoom transform.
  const [currentTransform, setCurrentTransform] = useState(d3.zoomIdentity);

  // Dictionary for province centroids.
  const [provinceCentroids, setProvinceCentroids] = useState({});
  const [cityCentroids, setCityCentroids] = useState({});
  const [countyCentroids, setCountyCentroids] = useState({});

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .style('overflow', 'visible');

    // Create or select a dedicated D3 container.
    let container = svg.select('.d3-container');
    if (container.empty()) {
      container = svg.append('g').attr('class', 'd3-container');
    }
    container.selectAll('*').remove();

    // Create groups inside the D3 container.
    const provincesGroup = container.append('g').attr('class', 'provinces');
    const citiesGroup = container.append('g').attr('class', 'cities');
    const labelsGroup = container.append('g').attr('class', 'labels');
    citiesGroup.style('display', 'none');

    // Set up projection and path generator.
    const projection = d3.geoMercator()
      .center([105, 38])
      .scale(800)
      .translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    // -------------------------
    // Load and draw provinces.
    // -------------------------
    d3.json('/china.json').then((geoData) => {
        const data = geoData;
        if (!data) {
          console.error('No GeoJSON data found.');
          return;
        }

        provincesGroup.selectAll('path.province')
        .data(data.features)
        .enter()
        .append('path')
        .attr('class', d => `province province-${d.properties.id}`)
        .attr('d', pathGenerator)
        .attr('stroke', '#333')
        .attr('fill', '#ccc')
        .on('mouseover', function(event, d) {
            d3.select(this).attr('fill', '#ffa500');
            if (onProvinceHover) onProvinceHover(d.properties);
        })
        .on('mouseout', function() {
            if (!onProvinceSelect) return;
            onProvinceHover(null);
            provincesGroup.selectAll('path.province').attr('fill', '#ccc');
        })
        .on('click', function(event, d) {
            event.preventDefault();
            event.stopPropagation();
            if (onProvinceSelect) {
              onProvinceSelect(d.properties);
              onProvinceHover(d.properties);
            }
        });

        // -------------------------
        // Load and draw city boundaries. And extract centroids
        // -------------------------
        const provinceCentroids = {};
        const cityCentroids = {}; // new dictionary
        data.features.forEach((province) => {
          const provinceCentroid = pathGenerator.centroid(province);
          provinceCentroids[province.properties.name] = provinceCentroid;
          const provinceId = province.properties.id;

          const cityFileUrl = `/geometryProvince/${provinceId}.json`;
          d3.json(cityFileUrl).then((cityGeoData) => {
              if (cityGeoData && cityGeoData.features && cityGeoData.features.length > 0) {
              // For each city feature, compute its centroid and store it.
              cityGeoData.features.forEach((feature) => {
                  const cityName = feature.properties.name; // e.g., "广州市"
                  const normalizedCity = normalizeCityName(cityName); // becomes "广州"
                  const cityCentroid = pathGenerator.centroid(feature);
                  cityCentroids[normalizedCity] = cityCentroid;
              });
              // Then, also draw the city boundaries as before.
              citiesGroup.append('g')
                  .attr('class', `cities-${provinceId}`)
                  .selectAll('path.city')
                  .data(cityGeoData.features)
                  .enter()
                  .append('path')
                  .attr('class', 'city')
                  .attr('d', pathGenerator)
                  .attr('stroke', '#666')
                  .attr('stroke-width', 0.5)
                  .attr('fill', 'none');
              }
          }).catch((error) => {
              console.error(`Error loading city data for province ${provinceId}:`, error);
          });
        });
        setProvinceCentroids(provinceCentroids);
        setCityCentroids(cityCentroids);

        const countyCentroids = {};
        for(const cityId of cityIds) {
          const countyFileUrl = `/geometryCities/${cityId}`;

          d3.json(countyFileUrl).then((countyGeoData) => {
              if (countyGeoData && countyGeoData.features && countyGeoData.features.length > 0) {
                countyGeoData.features.forEach((feature) => {
                    const countyName = feature.properties.name; // e.g., "广州市"
                    const normalizedCounty = normalizeCityName(countyName);
                    const countyCentroid = pathGenerator.centroid(feature);
                    countyCentroids[normalizedCounty] = countyCentroid;
                });
              }
          }).catch((error) => {
              console.log(countyFileUrl);
          });
        }
        setCountyCentroids(countyCentroids);

        // -------------------------
        // Load friend data.
        // -------------------------
        d3.json('/friends.json').then((friendDataRaw) => {
        setFriends(friendDataRaw);
        if (onFriendDataUpdate) {
            onFriendDataUpdate(friendDataRaw);
        }
        }).catch((error) => {
        console.error('Error loading friend data:', error);
        });

        // -------------------------
        // Add zoom behavior.
        // -------------------------
        const zoomBehavior = d3.zoom()
        .scaleExtent([1, 20])
        .on('zoom', (event) => {
            setCurrentTransform(event.transform);
            container.attr('transform', event.transform);
            if (event.transform.k > zoomThreshold) {
            citiesGroup.style('display', 'block');
            } else {
            citiesGroup.style('display', 'none');
            }
            labelsGroup.raise();
            svg.select('.react-friends').raise();
        });
        svg.call(zoomBehavior);
    }).catch((error) => {
      console.error('Error loading provinces GeoJSON:', error);
    });
  }, []);

  return (
    <div className="relative flex justify-center items-center p-4">
      <svg ref={svgRef} width={width} height={height}>
        {/* D3-managed elements are appended into the .d3-container by D3 */}
        <g className="react-friends">
          <FriendMarkers 
            friends={friends}
            provinceCentroids={provinceCentroids}
            cityCentroids={cityCentroids}
            countyCentroids={countyCentroids}
            zoomScale={currentTransform.k}
            transform={currentTransform.toString()}
            onFriendSelect={onFriendSelect}
          />
        </g>
      </svg>
    </div>
  );
};

export default ChinaMap;
