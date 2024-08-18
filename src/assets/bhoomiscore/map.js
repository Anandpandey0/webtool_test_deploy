// map.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS here

const legendColors = {
  high: "#1a9850",
  mediumHigh: "#66bd63",
  medium: "#a6d96a",
  mediumLow: "#d9ef8b",
  low: "#fee08b",
  negative: "#ff0000",
  na: "#808080",
};

function Map() {
  const [loading, setLoading] = useState(true);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        // Fetching the GeoJSON file using the relative path
        const response = await fetch('/Bhoomiscore_Roorkee_fields/Roorkee_fields_bhoomiscore_monthly_ndvi.geojson');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJSON();
  }, []);

  function getColor(ndviValue) {
    if (ndviValue === "N/A" || ndviValue === undefined) {
      return legendColors.na; // Gray for N/A values
    }

    const value = parseFloat(ndviValue);
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
    // Using a recent NDVI property (for example: "2024-06")
    const meanNdvi = feature.properties['2024-06']; 
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
    const meanNdvi = feature.properties['2024-06']; // Adjust to the month you want to visualize
    const formattedNdviValue = meanNdvi !== null ? meanNdvi : "N/A";
    
    // Bind popup content to the layer and handle mouse events
    layer.bindPopup(`
      <b>Farm ID:</b> ${feature.properties.farm_id}<br/>
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

  return (
    <main className="w-[60vw] h-[100vh]">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className=" w-[80vw]">
            <MapContainer
              center={[29.8398, 77.9685]} // Adjust based on the location of Roorkee
              zoom={12} // Adjust based on your desired zoom level
              style={{ height: "80vh", width: "80%", border: "solid 2px black" }}
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
            bottom: 150,
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
