import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS here

const legendColors = {
  "4.5-5": "#cc0000",   // 4.5-5 hectares
  "4-4.5": "#ff0000",   // 4-4.5 hectares
  "3.5-4": "#ff3300",   // 3.5-4 hectares
  "3-3.5": "#ff6600",   // 3-3.5 hectares
  "2.5-3": "#ff9900",   // 2.5-3 hectares
  "2-2.5": "#ffcc00",   // 2-2.5 hectares
  "1.5-2": "#ffff33",   // 1.5-2 hectares
  "1-1.5": "#ffff66",   // 1-1.5 hectares
  "0.5-1": "#ffff99",   // 0.5-1 hectares
  "0.1-0.5": "#ffffcc", // 0.1-0.5 hectares
  "0-0.1": "#ffffe0",   // 0-0.1 hectares
  0: "transparent",     // Transparent for 0% values
};

function Map() {
  const [loading, setLoading] = useState(true);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(
          "/Crop_damage_Village_level_March_2024/UP_Saharanpur_Villages_with_crop_damage_June_2024.geojson"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  const mapBounds = [
    [29.9680 - 0.5, 77.5552 - 0.5], // southWest corner of the bounds
    [29.9680 + 0.5, 77.5552 + 0.5], // northEast corner of the bounds
  ];

  function getColor(damageArea) {
    const value = parseFloat(damageArea);
    if (isNaN(value) || value === undefined) {
      return legendColors[0]; // Transparent for N/A or undefined values
    }

    // Find the appropriate color based on the Damage_area
    if (value >= 4.5) return legendColors["4.5-5"];
    if (value >= 4) return legendColors["4-4.5"];
    if (value >= 3.5) return legendColors["3.5-4"];
    if (value >= 3) return legendColors["3-3.5"];
    if (value >= 2.5) return legendColors["2.5-3"];
    if (value >= 2) return legendColors["2-2.5"];
    if (value >= 1.5) return legendColors["1.5-2"];
    if (value >= 1) return legendColors["1-1.5"];
    if (value >= 0.5) return legendColors["0.5-1"];
    if (value >= 0.1) return legendColors["0.1-0.5"];
    if (value > 0) return legendColors["0-0.1"];
    return legendColors[0]; // Transparent for 0% values
  }

  function style(feature) {
    const damageArea = feature.properties["Damage_area"];
    return {
      fillColor: getColor(damageArea),
      weight: damageArea === 0 ? 0 : 1.5, // Set thickness to 0 if Damage_area is 0
      opacity: 1,
      color: damageArea === 0 ? "transparent" : "blue", // Make border color transparent if Damage_area is 0
      fillOpacity: damageArea === 0 ? 0 : 1, // Make transparent if 0
    };
  }

  function onEachFeature(feature, layer) {
    const damageArea = feature.properties["Damage_area"];

    // Only bind a popup if the Damage_area is not zero
    if (damageArea > 0) {
      const formattedValue = damageArea !== null ? damageArea : "N/A";

      layer.bindPopup(`
        <b>Damage Area:</b> ${formattedValue} hectares<br/>
      `);

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

  return (
    <main className="w-[60vw] h-[60vh]">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-[80vw] ">
            <MapContainer
              center={[29.9680, 77.5552]} // Adjust based on your desired center
              zoom={10} // Adjust based on your desired zoom level
              maxBounds={mapBounds}
              minZoom={10} // Minimum zoom level
              maxZoom={18} // Maximum zoom level
              style={{
                height: "70vh",
                width: "80%",
                border: "solid 2px black",
              }}
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
            bottom: "50px",
            left: "50px",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <h4>Damage Area Legend</h4>
          <div>
            {["4.5-5", "4-4.5", "3.5-4", "3-3.5", "2.5-3", "2-2.5", "1.5-2", "1-1.5", "0.5-1", "0.1-0.5", "0-0.1", "0"].map((key) => (
              <div
                key={key}
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
                    backgroundColor: legendColors[key],
                    marginRight: "5px",
                  }}
                ></span>
                <span>
                  {key === "0-10" ? "0-10%" : key + " hectares"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Map;
