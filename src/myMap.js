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
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
};

const MyMap = () => {
  const [mapCenter, setMapCenter] = useState([40.7128, -74.006]); // Initial position
  const zoom = 13;
  const [bigfoot_sightings, setBigfootSightings] = useState([]);

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

  const longitudeArray = [];
  const latitudeArray = [];

  parsedData.forEach((row) => {
    longitudeArray.push(row[longitudeColumnIndex]);
    latitudeArray.push(row[latitudeColumnIndex]);
  });

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "80vh", width: "100%" }}
    >
      <ChangeView center={mapCenter} zoom={zoom} />
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
    </MapContainer>
  );
};

export default MyMap;
