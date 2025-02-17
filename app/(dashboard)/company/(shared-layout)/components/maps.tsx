/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

import { NEXT_PUBLIC_GOOGLE_MAP_API } from "@/app/constant";
//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { TextInput, Button, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 11.25rem)",
};

//Default zoom level, can be adjusted
const defaultMapZoom = 10;

//Map options
const defaultMapOptions = {
  zoomControl: true,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
  maxZoom: 18, // Set the maximum zoom level
  minZoom: 3, // Set the minimum zoom level
};

const MapComponent = () => {
  const { setValue, watch } = useFormContext();

  const watchLatitude = watch("latitude") || "";
  const watchLongitude = watch("longitude") || "";

  const [newMarkerPosition, setNewMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: Number(watchLatitude) || 40.7128,
    lng: Number(watchLongitude) || 74.006,
  });
  const [addressSearch, setAddressSearch] = useState<string>("");
  const [toastState, setToastState] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const onMarkerDragEnd = (event: {
    latLng: { lat: () => any; lng: () => any };
  }) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setNewMarkerPosition({ lat: newLat, lng: newLng });

    setValue("latitude", newLat, { shouldDirty: true });
    setValue("longitude", newLng, { shouldDirty: true });
  };

  const searchLocation = async (address: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${NEXT_PUBLIC_GOOGLE_MAP_API}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setNewMarkerPosition(location);
      setValue("latitude", location.lat, { shouldDirty: true });
      setValue("longitude", location.lng, { shouldDirty: true });
    } else {
      setToastState({
        show: true,
        message: "Location not found!",
        isError: true,
      });
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (toastState.show) {
      timeout = setTimeout(() => {
        setToastState({ show: false, message: "", isError: false });
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [toastState.show]);

  return (
    <div className="w-full relative ">
      <div className="absolute w-96 top-2 left-1 z-10">
        <div className="flex items-center">
          <TextInput
            className="mr-2"
            placeholder="Enter address"
            color="primary"
            onChange={(evt) => {
              setAddressSearch(evt.target.value);
            }}
          />
          <Button
            color="primary"
            onClick={(_evt: any) => {
              searchLocation(addressSearch);
            }}
          >
            Search
          </Button>
        </div>
      </div>
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
        <div className="absolute bottom-0 w-full bg-white/50 p-5 z-10">
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
      {toastState?.show && (
        <Toast
          className={`absolute right-5 top-5 z-[9999] ${
            toastState?.isError ? "bg-red-600" : "bg-primary-500"
          }`}
        >
          <div className="ml-3 text-sm font-normal text-white">
            {toastState?.message}
          </div>
          <Toast.Toggle
            className={toastState?.isError ? "bg-red-600" : "bg-primary-500"}
            onClick={() =>
              setToastState({ show: false, message: "", isError: false })
            }
          />
        </Toast>
      )}
    </div>
  );
};

export { MapComponent };
