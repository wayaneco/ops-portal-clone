/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "15px 0px 0px 15px",
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
  const { setValue, watch } = useFormContext();

  const watchLatitude = watch("latitude");
  const watchLongitude = watch("longitude");
  const [newMarkerPosition, setNewMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: watchLatitude,
    lng: watchLongitude,
  });

  const onMarkerDragEnd = (event: {
    latLng: { lat: () => any; lng: () => any };
  }) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setNewMarkerPosition({ lat: newLat, lng: newLng });

    setValue("latitude", newLat);
    setValue("longitude", newLng);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setNewMarkerPosition({
          lat: latitude,
          lng: longitude,
        });

        setValue("latitude", latitude);
        setValue("longitude", longitude);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={newMarkerPosition}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {/* Add Marker Component */}
        <Marker
          position={newMarkerPosition}
          draggable={true}
          onDragEnd={onMarkerDragEnd as any}
        />
      </GoogleMap>
      {(newMarkerPosition.lat || newMarkerPosition.lng) && (
        <div className="mt-10">
          <div className="flex justify-between">
            <div className="flex text-black text-lg">
              <div>Latitude: </div>
              <strong className="ml-2">{newMarkerPosition.lat}</strong>
            </div>
            <div className="flex text-black text-lg">
              <div>Longitude:</div>
              <strong className="ml-2">{newMarkerPosition.lng}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { MapComponent };
