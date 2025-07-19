// src/components/MapBg.jsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapBg = () => {
  return (
    <div className="absolute inset-0 z-[0] pointer-events-auto">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 150 }}
        width={1000}
        height={600}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="#dddddd"
                strokeWidth={0.3}
                style={{
                  default: {
                    fill: "#999999",     // Soft gray
                    opacity: 0.2,         // Low opacity to make it subtle
                    transition: "all 0.3s ease-in-out",
                  },
                  hover: {
                    fill: "#D84040",
                    opacity: 0.6,
                    filter: "drop-shadow(0px 0px 6px #D84040)",
                  },
                  pressed: {
                    fill: "#007acc",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapBg;
