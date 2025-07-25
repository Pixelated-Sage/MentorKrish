import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapBg = () => {
  /*
    Using CSS transform scale for zoom on small devices,
    plus adjusting projection zoom slightly for better phone look.
  */
  return (
    <div className="absolute inset-0 z-[0] pointer-events-auto overflow-visible">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 160 }}
        width={1000}
        height={600}
        style={{ width: "100%", height: "100%" }}
        className="scale-190 -mt-[3rem] md:scale-100 md:mt-[0] origin-center transition-transform duration-500"
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
                    fill: "#999999", // Soft gray
                    opacity: 0.2,
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
