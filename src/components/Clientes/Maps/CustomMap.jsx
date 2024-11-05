import React, { useState } from 'react'
import "../../../styles/Map.scss";
import { Map, Marker} from "@vis.gl/react-google-maps"

function CustomMap() {

  const [markerLocation, setMarkerLocation] = useState({
    lat: 14.772975,
    lng: -91.183626,
  });

  return (
    <>
      <div className="map-container">
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <Marker position={markerLocation} />
        </Map>
      </div>
    </>
  )
}

export default CustomMap