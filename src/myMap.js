import React, { useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMap,
// } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useMapEvent, useMapEvents} from 'react-leaflet/hooks'
import Papa from "papaparse";
// import data from "./bfro_locations.csv";
import data from "./points.csv";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { loadCSVData } from "./data_processing";

// Component to update map center
// const ChangeView = ({ center, zoom }) => {
//   const map = useMap();
//   map.flyTo(center, zoom);
//   return null;
// };
const initialMarkers = [
  { lat: 40.7128, lng: -74.006, time:0}, // New York City
  // { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  // { lat: 41.8781, lng: -87.6298 }, // Chicago
];



const MyMap = () => {
  const [mapCenter, setMapCenter] = useState([40.7128, -74.006]); // Initial position
  const zoom = 13;
  const [bigfoot_sightings, setBigfootSightings] = useState([]);
  const [markers, setMarkers] = useState(initialMarkers);
  const [edges, setEdges] = useState([]);
  const [time, setTime] = useState(0);
  const handleRightClick = (e) => {
  // Handle right-click event
  // You can add your custom logic for right-click here if needed
    console.log("Right-click event:", e);
  };
  const handleLeftClick = () => {
    //Handle left-click event
    // const { lat, lng } = e.latlng;
    // const newMarker = { lat, lng };
    // setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

    // Call the KNN algorithm and draw the K-nearest neighbors
    const k = 3; // Replace with your desired K value
    drawKNearestNeighbors({lat: 40.7128, lng: -74.006}, k);


  };

  const drawKNearestNeighbors = (clickedPoint, k) => {
    // Implement your KNN algorithm here to find the K-nearest neighbors based on 'clickedPoint' and 'markers' state.
    // For simplicity, let's just draw the 'k' nearest markers with a different color.

    // Calculate distances between clicked point and all other points
    const distances = markers.map((marker) => {
      const dx = marker.lat - clickedPoint.lat;
      const dy = marker.lng - clickedPoint.lng;
      return Math.sqrt(dx * dx + dy * dy);
    });

    // Find indices of 'k' nearest neighbors
    const nearestIndices = distances
      .map((distance, index) => [distance, index])
      .sort((a, b) => a[0] - b[0])
      .slice(0, k)
      .map((item) => item[1]);

    // Draw the 'k' nearest neighbors with a different color
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker, index) => {
        const isNearest = nearestIndices.includes(index);
        return { ...marker, isNearest };
      })
    );
  };
  //   useEffect(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const lat = position.coords.latitude;
  //           const lon = position.coords.longitude;

  //           setMapCenter([lat, lon]); // Update map center
  //         },
  //         (error) => {
  //           console.log(`Error: ${error.message}`);
  //         }
  //       );
  //     } else {
  //       console.log("Geolocation is not supported by this browser.");
  //     }
  //     loadCSVData()
  //       .then((data) => {
  //         const validData = data.filter(
  //           (sighting) =>
  //             typeof sighting.latitude === "number" &&
  //             typeof sighting.longitude === "number" &&
  //             !isNaN(sighting.latitude) &&
  //             !isNaN(sighting.longitude)
  //         );
  //         setBigfootSightings(validData);
  //       })
  //       .catch((error) => {
  //         console.error("Error loading CSV data:", error);
  //       });
  //   }, []);

  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(data, {
        download: true,
        delimiter: ",",
        complete: (result) => {
          setParsedData(result.data);
        },
      });
    };
    fetchParseData();
  }, []);

  const longitudeColumnIndex = 5; // Replace with the actual longitude column index
  const latitudeColumnIndex = 4; // Replace with the actual latitude column index

  const longitudeArray = [
    -142.9, -132.7982, -132.8202, -141.5667, -149.7853, -141.3165, -147.8142,
    -145.3427, -85.16235, -87.32655, -86.4559, -86.66465, -87.02025, -87.50905,
    -87.1105, -88.17885, -88.08305, -87.45876, -87.96095, -86.6333, -87.00665,
    -87.09069, -88.14999, -87.35664, -87.31821, -86.52105, -85.4258, -86.64066,
    -86.4664, -86.7891, -87.24547, -86.99782, -85.705,
  ];
  const latitudeArray = [
    61.5, 55.1872, 55.2035, 62.9375, 61.0595, 62.77335, 64.89139, 61.96802,
    32.31435, 33.28375, 34.95605, 34.5422, 34.9263, 34.80405, 34.92855,
    33.13195, 31.4515, 33.97575, 31.58255, 34.4881, 34.6802, 31.16, 33.13,
    33.21145, 33.26035, 34.7325, 32.6218, 33.3674, 33.6205, 33.8132, 32.30673,
    31.00002, 32.43,
  ];

  parsedData.forEach((row) => {
    longitudeArray.push(row[longitudeColumnIndex]);
    latitudeArray.push(row[latitudeColumnIndex]);
  });
  const slicedLongitudeArray = longitudeArray.slice(1);
  const slicedLatitudeArray = latitudeArray.slice(1);
  let bit = true;
  function MyComponent() {
  const map = useMapEvent('click', () => {
    //map.setView([50.5, 30.5], map.getZoom())
    if (bit) {
      const newEdges = [
        {lat: 40.8959, lng: -74.2918},
        {lat: 40.77545, lng: -74.3516},
        {lat: 40.478, lng: -74.4611},
        {lat: 40.9934, lng: -74.3249},
        {lat: 40.93552, lng: -74.49518},
        {lat: 41.06945, lng: -74.15562}
      ];
      setEdges(newEdges);
      handleLeftClick();
      console.log(edges);
      setTime(.1)
    }
  })
  return null
}
  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "80vh", width: "100%" }}
    >
      {/*<ChangeView center={mapCenter} zoom={zoom} />*/}
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
      />
      /* Add Markers for each Bigfoot sighting */
      {/* {bigfoot_sightings.map((sighting, index) => (
        <Marker key={index} position={[sighting.latitude, sighting.longitude]}>
          <Popup>
            <h2>{sighting.title}</h2>
            <p>{sighting.observed}</p>
          </Popup>
        </Marker>
      ))} */}
      {latitudeArray.map((lat, index) => (
        <CircleMarker
          key={index}
          center={[lat, longitudeArray[index]]}
          radius={15}
          color="red"
        >
          <Popup>
            <h2>Marker {index + 1}</h2>
            <p>
              Latitude: {lat}, Longitude: {longitudeArray[index]}
            </p>
          </Popup>
        </CircleMarker>
      ))}
      {markers.map((marker, index) => (
        <CircleMarker
          key={index}
          center={[marker.lat, marker.lng]}
          radius={15}
          color="green"
        >
          <Popup>
            <h2>Marker {index + 1}</h2>
            <p>
              Latitude: {marker.lat}, Longitude: {marker.lng}, Time: {time}ms
            </p>
          </Popup>
        </CircleMarker>
      ))}
      <MyComponent/>
      {edges.map((edge, index) => (
        <Polyline key={index} positions={[[edge.lat, edge.lng], [40.7128, -74.006]]} color="blue" />
      ))}
    </MapContainer>
  );
};

export default MyMap;
