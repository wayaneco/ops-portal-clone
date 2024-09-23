/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextInput, Button, Toast } from "flowbite-react";
//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";

import { useToastContext } from "@/app/components/Context/ToastProvider";

import { NEXT_PUBLIC_GOOGLE_MAP_API } from "@/app/constant";
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

  const { showToast } = useToastContext();

  async function getTimezone(latitude: number, longitude: number) {
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${NEXT_PUBLIC_GOOGLE_MAP_API}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const timezone = data.timeZoneId;

        const formatter = Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          timeZoneName: "short",
        });

        const parts = formatter.formatToParts(timestamp);
        const timeZoneName = parts.find(
          (part) => part.type === "timeZoneName"
        )?.value;

        setValue("time_zone", timeZoneName, { shouldDirty: true });
      } else {
        console.log("Error fetching timezone:", data.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const onMarkerDragEnd = (event: {
    latLng: { lat: () => any; lng: () => any };
  }) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setNewMarkerPosition({ lat: newLat, lng: newLng });

    setValue("latitude", newLat, { shouldDirty: true });
    setValue("longitude", newLng, { shouldDirty: true });

    getTimezone(newLat, newLng);
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

      getTimezone(location.lat, location.lng);
    } else {
      showToast({
        message: "Location not found!",
        error: true,
      });
    }
  };

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
    </div>
  );
};

export { MapComponent };
