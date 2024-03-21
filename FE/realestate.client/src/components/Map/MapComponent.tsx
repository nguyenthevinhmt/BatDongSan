import { environment } from "@/shared/environment/environment";
import React, { 
  useEffect, 
  useState 
} from "react";
import BingMapsReact from "bingmaps-react";

const MapComponent = ({ prop }: any) => {
  const [bingMapReady, setBingMapReady] = useState(false);
  const onMapReady = () => {
    setBingMapReady(true);
  };
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (prop?.latitude !== 0 && prop?.longitude !== 0) {
        onMapReady();
      }
    }, 500);
    return () => { clearTimeout(timeoutId) }
  }, [prop]);
  return (
    <>
      {bingMapReady && (
        <BingMapsReact
          bingMapsKey={environment.BingMapsApiKey}
          height={270}
          width={850}
          pushPins={[
            {
              center: {
                latitude: prop.latitude,
                longitude: prop.longitude,
              },
            },
          ]}
          viewOptions={{
            center: {
              latitude: prop?.latitude,
              longitude: prop?.longitude,
            },
            mapTypeId: "road",
            zoom: 16,
          }}
        />
      )}
    </>
  );
};

export default MapComponent;
