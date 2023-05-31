import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({ address }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleGeocode = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address[0] }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat: lat(), lng: lng() });
      } else {
        console.log(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };
  useEffect(() => {
    if (address[0] !== null) {
      handleGeocode();
    }
  }, [address]);

  return (
    <div>
      {coordinates.lat && (
        <div style={{ height: "400px", width: "100%" }}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={10}
            center={coordinates}
          >
            {coordinates.lat && coordinates.lng && (
              <Marker position={coordinates} />
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default Map;
