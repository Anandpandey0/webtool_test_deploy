import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS here

const legendColors = {
  10: "#004d00",
  9: "#006400",
  8: "#228b22",
  7: "#32cd32",
  6: "#9acd32",
  5: "#ffff00",
  4: "#ffd700",
  3: "#ff4500",
  2: "#ff6347",
  1: "#8b0000",
  na: "#000", // Gray for N/A values
};

function Map({ year, season }) {
  const [loading, setLoading] = useState(true);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        // Ensure the file path is correct
        const response = await fetch(
          "/Bhadras_fields_Bhoomiscore/Bhadras_Bhoomiscore_NDVI_monthly_mean.geojson"
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
    [27.21962656072526 - 0.1, 80.993353177544336 - 0.1], // southWest corner of the bounds
    [27.21962656072526 + 0.1, 80.993353177544336 + 0.1], // northEast corner of the bounds
  ];

  function getColor(bhoomiscore) {
    if (bhoomiscore === "N/A" || bhoomiscore === undefined) {
      return legendColors.na; // Gray for N/A values
    }

    const value = parseFloat(bhoomiscore);
    switch (true) {
      case value === 1:
        return legendColors[1];
      case value === 2:
        return legendColors[2];
      case value === 3:
        return legendColors[3];
      case value === 4:
        return legendColors[4];
      case value === 5:
        return legendColors[5];
      case value === 6:
        return legendColors[6];
      case value === 7:
        return legendColors[7];
      case value === 8:
        return legendColors[8];
      case value === 9:
        return legendColors[9];
      case value === 10:
        return legendColors[10];
      default:
        return legendColors.na; // Default to Gray if the value is not in the defined range
    }
  }

  function style(feature) {
    // Adjust this to the NDVI property you want to visualize (e.g., "2024-06")
    const bhoomiscore = feature.properties[`${year}_${season}`];
    const formattedNdviValue = bhoomiscore !== null ? bhoomiscore : "N/A";
    return {
      fillColor: getColor(formattedNdviValue),
      weight: 1.5,
      opacity: 1,
      color: "blue",
      fillOpacity: 1,
    };
  }

  function onEachFeature(feature, layer) {
    // Adjust this to the NDVI property you want to visualize (e.g., "2024-06")
    const bhoomiscore = feature.properties[`${year}_${season}`];
    console.log(year, season);

    const formattedNdviValue = bhoomiscore !== null ? bhoomiscore : "N/A";

    // Bind popup content to the layer and handle mouse events
    layer.bindPopup(`
      <b>Bhoomiscore:</b> ${formattedNdviValue}
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
    <main className="w-[60vw] h-[60vh]">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-[80vw] ">
            <MapContainer
              center={[27.21962656072526, 80.993353177544336]} // Adjust based on your desired center
              zoom={15} // Adjust based on your desired zoom level
              maxBounds={mapBounds}
              minZoom={15} // Minimum zoom level
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
          <h4>Bhoomiscore Legend</h4>
          <div>
            {Object.keys(legendColors)
              .filter((key) => key !== "na") // Filter out 'na' first
              .reverse() // Reverse the order of the remaining keys
              .map((key) => (
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
                  <span>{key}</span>
                </div>
              ))}
            {/* Add 'na' at the end */}
            <div
              key="na"
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
                  backgroundColor: legendColors["na"],
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
