import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS here

const legendColors = {
  100: "#cc0000",
  90: "#ff0000",
  80: "#ff1100",
  70: "#ff3300",
  60: "#ff6600",
  50: "#ff9900",
  40: "#ffcc00",
  30: "#ffff33",
  20: "#ffff66",
  10: "#ffff99",
  "0-10": "#ffffe0", // Representing values between 0-10%
  0: "transparent", // Transparent for 0% values
};

function Map({ damagedArea, percentageDamage, reimbursement }) {
  const [loading, setLoading] = useState(true);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(
          "/Crop_damage_Roorkee_fields_March_2024_with_Insurance_reimbursement_example/Crop_damage_fields_roorkee.geojson"
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
    [29.8543 - 0.1, 77.888 - 0.1], // southWest corner of the bounds
    [29.8543 + 0.1, 77.888 + 0.1], // northEast corner of the bounds
  ];

  function getColor(percentageDamageArea) {
    const value = parseFloat(percentageDamageArea);
    if (isNaN(value) || value === undefined) {
      return legendColors[0]; // Transparent for N/A or undefined values
    }

    // Find the appropriate color based on the percentageDamageArea
    if (value >= 100) return legendColors[100];
    if (value >= 90) return legendColors[90];
    if (value >= 80) return legendColors[80];
    if (value >= 70) return legendColors[70];
    if (value >= 60) return legendColors[60];
    if (value >= 50) return legendColors[50];
    if (value >= 40) return legendColors[40];
    if (value >= 30) return legendColors[30];
    if (value >= 20) return legendColors[20];
    if (value >= 10) return legendColors[10];
    if (value > 0) return legendColors["0-10"];
    return legendColors[0]; // Transparent for 0% values
  }

  function style(feature) {
    const percentageDamageArea = feature.properties["percentage_damage_area"];
    return {
      fillColor: getColor(percentageDamageArea),
      weight: percentageDamageArea === 0 ? 0 : 1.5, // Set thickness to 0 if percentageDamageArea is 0
      opacity: 1,
      color: percentageDamageArea === 0 ? "transparent" : "blue", // Make border color transparent if percentageDamageArea is 0
      fillOpacity: percentageDamageArea === 0 ? 0 : 1, // Make transparent if 0
    };
  }

  function onEachFeature(feature, layer) {
    const percentageDamageArea = feature.properties["percentage_damage_area"];
    const DamageFieldArea = feature.properties["Damaged_field_area"];
    const Reimbursement = feature.properties["Reimbursement"];
    

    // Only bind a popup if the percentageDamageArea is not zero
    if (percentageDamageArea > 0) {
      const formattedValue =
        percentageDamageArea !== null ? percentageDamageArea : "N/A";

      layer.bindPopup(`
        <b>Percentage Damage Area:</b> ${formattedValue}%<br/>
        <b>Damage Field Area:</b> ${DamageFieldArea} hec<br/>
        <b>Reimbursement : Rs </b> ${Reimbursement}
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
              center={[29.8543, 77.888]} // Adjust based on your desired center
              zoom={12} // Adjust based on your desired zoom level
              maxBounds={mapBounds}
              minZoom={12} // Minimum zoom level
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
          <h4>Percentage Damage Area </h4>
          <div>
            {["100", "90", "80", "70", "60", "50", "40", "30", "20", "10", "0-10", "0"].map((key) => (
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
                <span></span>
                <span>
                  {key === "0-10" ? "0-10%" : key + "%"}
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
