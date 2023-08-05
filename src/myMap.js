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
import { useMapEvent, useMapEvents } from "react-leaflet/hooks";
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
  { lat: 40.7128, lng: -74.006, time: 0 }, // New York City
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
    drawKNearestNeighbors({ lat: 40.7128, lng: -74.006 }, k);
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
  const descriptionColumnIndex = 1;

  const longitudeArray = [];
  const latitudeArray = [];
  const descriptionArray = [];

  parsedData.forEach((row) => {
    longitudeArray.push(row[longitudeColumnIndex]);
    latitudeArray.push(row[latitudeColumnIndex]);
    descriptionArray.push(row[descriptionColumnIndex]);
  });
  const slicedLongitudeArray = longitudeArray.slice(1);
  const slicedLatitudeArray = latitudeArray.slice(1);
  const slicedDescriptionArray = descriptionArray.slice(1);
  let bit = true;
  function MyComponent() {
    const map = useMapEvent("click", () => {
      //map.setView([50.5, 30.5], map.getZoom())
      if (bit) {
        const newEdges = [
          { lat: 40.8959, lng: -74.2918 },
          { lat: 40.77545, lng: -74.3516 },
          { lat: 40.478, lng: -74.4611 },
          { lat: 40.9934, lng: -74.3249 },
          { lat: 40.93552, lng: -74.49518 },
          { lat: 41.06945, lng: -74.15562 },
        ];
        setEdges(newEdges);
        handleLeftClick();
        console.log(edges);
        setTime(0.1);
      }
    });
    return null;
  }
  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "100vh", width: "65%" }}
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
              Latitude: {lat}, Longitude: {longitudeArray[index]},
              {descriptionArray[index]}
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
      <MyComponent />
      {edges.map((edge, index) => (
        <Polyline
          key={index}
          positions={[
            [edge.lat, edge.lng],
            [40.7128, -74.006],
          ]}
          color="blue"
        />
      ))}
    </MapContainer>
  );
};

export default MyMap;
