/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "15px 0px 0px 15px",
};

//K2's coordinates
const defaultMapCenter = {
  lat: 45.20489171079101,
  lng: -103.67174796177827,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 1;

//Map options
const defaultMapOptions = {
  zoomControl: true,
  gestureHandling: "auto",
  mapTypeId: "satellite",
  maxZoom: 18, // Set the maximum zoom level
  minZoom: 3, // Set the minimum zoom level
};

const MapComponent = () => {
  const [newMarkerPosition, setNewMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>(defaultMapCenter);

  const onMarkerDragEnd = (event: {
    latLng: { lat: () => any; lng: () => any };
  }) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setNewMarkerPosition({ lat: newLat, lng: newLng });

    // You can use these new coordinates wherever you need
    console.log("New position:", { lat: newLat, lng: newLng });
  };
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {/* Add Marker Component */}
        <Marker
          position={newMarkerPosition}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
