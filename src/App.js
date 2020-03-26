import React,{useEffect} from 'react';
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'
import cases_country from './data/cases_country'

const MapContainer = styled.div`
  width:100%;
  height:100vh;
`

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  useEffect(()=>{
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9'
    })
    map.on('load',()=>{
      map.addSource('covid-cases-source',{
        type:"geojson",
        data:cases_country
      })
      map.addLayer({
        id:"covid-cases-layer",
        type:'circle',
        source:'covid-cases',
        paint:{
          'circle-color':'red'
        }
      })
    })
  })
  return (
    <MapContainer id="map">
      
    </MapContainer>
  );
}

export default App;
