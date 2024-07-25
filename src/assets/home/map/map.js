// map.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS here

const paths = {
  Uttarakhand: {
    district: "/data/Uttarakhand_District.geojson",
    tehsil: "/data/Uttarakhand_Tehsil.geojson",
    village: "/data/Uttarakhand_Village.geojson",
  },
  UttarPradesh: {
    district: "/data/UP_District.geojson",
    tehsil: "/data/UP_Tehsil.geojson",
    village: "/data/UP_Village.geojson",
  },
};

const mapSettings = {
  Uttarakhand: {
    district: {
      center: [30.092455768971508, 79.30945970412586],
      zoom: 8,
    },
    tehsil: {
      center: [29.911216569327053, 78.02489535727946],
      zoom: 10,
    },
    village: {
      center: [29.955333263072994, 77.87538573094236],
      zoom: 11,
    },
  },
  UttarPradesh: {
    district: {
      center: [26.625, 80.678],
      zoom: 7,
    },
    tehsil: {
      center: [30.0, 77.542],
      zoom: 10,
    },
    village: {
      center: [30.0, 77.542],
      zoom: 11,
    },
  },
};

const legendColors = {
  high: "#1a9850",
  mediumHigh: "#66bd63",
  medium: "#a6d96a",
  mediumLow: "#d9ef8b",
  low: "#fee08b",
  negative: "#ff0000",
  na: "#808080",
};

function Map({
  selectedState,
  selectedLevel,
  selectedMonthYear,
  formattedMonthYear,
}) {
  const [loading, setLoading] = useState(true);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(paths[selectedState][selectedLevel]);
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedState, selectedLevel, selectedMonthYear]); // Include selectedMonthYear in dependency array

  function getColor(formattedNdviValue) {
    if (formattedNdviValue === "N/A" || formattedNdviValue === undefined) {
      return legendColors.na; // Gray for N/A values
    }

    const value = parseFloat(formattedNdviValue);
    if (value < 0) {
      return legendColors.negative; // Red for negative values
    } else if (value > 0.8) {
      return legendColors.high;
    } else if (value > 0.5) {
      return legendColors.mediumHigh;
    } else if (value > 0.3) {
      return legendColors.medium;
    } else if (value > 0.1) {
      return legendColors.mediumLow;
    } else {
      return legendColors.low;
    }
  }

  function style(feature) {
    const meanNdvi = feature.properties[formattedMonthYear];
    const formattedNdviValue = meanNdvi !== null ? meanNdvi : "N/A";
    return {
      fillColor: getColor(formattedNdviValue),
      weight: 1.5,
      opacity: 1,
      color: "blue",
      fillOpacity: 1,
    };
  }

  function onEachFeature(feature, layer) {
    if (feature.properties) {
      const nameProperty = selectedLevel.toUpperCase();
      const districtName = feature.properties[nameProperty];

      // Function to get NDVI value for selected month and year
      const getNdviValue = (month, year) => {
        const key = `${year}-${(
          new Date(Date.parse(month + " 1, " + year)).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;
        return feature.properties[key];
      };

      const [selectedMonth, selectedYear] = selectedMonthYear.split(" ");
      const ndviValue = getNdviValue(selectedMonth, selectedYear);
      const formattedNdviValue = ndviValue != null && ndviValue !== undefined ? ndviValue : "N/A";

      // Bind popup content to the layer and handle mouse events
      layer.bindPopup(`
        <b>${selectedLevel.toUpperCase()}</b>: ${districtName}<br/>
        <b>Month-Year:</b> ${selectedMonth} ${selectedYear}<br/>
        <b>NDVI:</b> ${formattedNdviValue}
      `);

      // Mouseover event: change style and open popup
      layer.on({
        mouseover: (event) => {
          layer.setStyle({
            weight: 2,
            color: "red",
            fillOpacity: 1,
          });
          layer.openPopup();
        },
        mouseout: () => {
          layer.setStyle(style(feature));
          layer.closePopup();
        },
      });
    }
  }

  // Get map center and zoom based on selectedState and selectedLevel
  const { center, zoom } = mapSettings[selectedState][selectedLevel];

  return (
    <main className="w-[60vw] h-[100vh]">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="border-2 border-solid border-black w-[80vw]">
            <MapContainer
              key={`${selectedState}-${selectedLevel}`} // Add key to ensure re-render on state or level change
              center={center} // Use dynamic center coordinates based on selectedState and selectedLevel
              zoom={zoom} // Use dynamic zoom level based on selectedState and selectedLevel
              style={{ height: "100vh", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {geojsonData && (
                <GeoJSON
                  data={geojsonData}
                  style={style}
                  onEachFeature={onEachFeature}
                />
              )}

              <ScaleControl position="bottomleft" />
            </MapContainer>
          </div>
        )}

        {/* Legend or Color Scale */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 500,
            background: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <h4>NDVI Legend</h4>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "10px",
                  backgroundColor: legendColors.high,
                  marginRight: "5px",
                }}
              ></span>
              <span>0.8+</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "10px",
                  backgroundColor: legendColors.mediumHigh,
                  marginRight: "5px",
                }}
              ></span>
              <span>0.5 - 0.79</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "10px",
                  backgroundColor: legendColors.medium,
                  marginRight: "5px",
                }}
              ></span>
              <span>0.3 - 0.49</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "10px",
                  backgroundColor: legendColors.mediumLow,
                  marginRight: "5px",
                }}
              ></span>
              <span>0.1 - 0.29</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "10px",
                  backgroundColor: legendColors.low,
                  marginRight: "5px",
                }}
              ></span>
              <span>Less than 0.1</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "10px",
                  backgroundColor: legendColors.na,
                  marginRight: "5px",
                }}
              ></span>
              <span>N/A</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Map;
