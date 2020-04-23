import React, { useState } from "react";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import styled from "styled-components";
import Control from "./componentes/Control";

const Contenedor = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100vh;
  @media screen and (min-width: 700px) {
    & .seccion1 {
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      width: 400px;
      height: 600px;
      z-index: 1;
      left: 15%;
      top: 10%;
      color: white;
    }
  }
`;

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

function App() {
  const [map, setMap] = useState(null);
  const [dataTornadosEstado, setDataTornadosEstado] = useState(null);
  // const {isLoading,data,error} = useQuery('estados',getDataTornados)
  // console.log(data)
  const setTornadosPorEstado = data => {
    console.log(data);

    setDataTornadosEstado(data);
  };

  return (
    <Contenedor>
      <div className="seccion1">
        <Control
          setTornadosPorEstado={setTornadosPorEstado}
          map={map}
        ></Control>
      </div>
      <div>
        <Map
          onStyleLoad={map => {
            setMap(map);
          }}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100%"
          }}
          zoom={[4]}
          center={[-104.4082672, 39.0990156]}
        >
          <GeoJSONLayer
            id="tornados_estados"
            data={`${process.env.REACT_APP_URL_API}/tornados/estados`}
            fillPaint={{
              "fill-color": [
                "step",
                ["get", "numtornados"],
                "#ff8a80",
                10,
                "#ff5252",
                100,
                "#ff1744",
                250,
                "#d50000",
                500,
                "#DD2C00"
              ],
              "fill-opacity": 0.5
            }}
          />
          <GeoJSONLayer
            id="tornados-estado"
            data={dataTornadosEstado}
            lineLayout={{
              "line-cap": "round"
            }}
            linePaint={{
              "line-color": "red",
              "line-blur": 3,
              "line-width": [
                "step",
                ["get", "mag"],
                1,
                0,
                4,
                2,
                6,
                3,
                8,
                4,
                10,
                5,
                12
              ]
            }}
          ></GeoJSONLayer>
        </Map>
      </div>
    </Contenedor>
  );
}

export default App;
