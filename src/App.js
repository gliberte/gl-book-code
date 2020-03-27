import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import cases_country from "./data/cases_country";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v9"
    });
    map.on("load", () => {
      map.addSource("covid-cases-source", {
        type: "geojson",
        data: cases_country
      });
      map.addLayer({
        id: "covid-cases-layer",
        type: "circle",
        source: "covid-cases-source",
        paint: {
          "circle-color": "red",
          "circle-radius": [
            "step",
            ["get", "Confirmed"],
            3,
            100,
            5,
            500,
            7,
            1000,
            9,
            10000,
            12,
            50000,
            15,
            80000,
            20
          ]
        }
      });
      map.addLayer({
        id: "covid-cases-layer_text",
        type: "symbol",
        source: "covid-cases-source",
        layout: {
          "text-field": `{Confirmed}`,
          "text-offset": [1, -1]
        }
      });
    });
  });
  return <MapContainer id="map"></MapContainer>;
}

export default App;
