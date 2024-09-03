// import React, { useEffect } from 'react';

// const MapComponent = () => {
//   useEffect(() => {
//     // Function to initialize the map
//     const initMap = () => {
//       const google = window.google; // Access the google object from the window

//       const map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 6,
//       });

//       const infoWindow = new google.maps.InfoWindow();

//       const locationButton = document.createElement('button');
//       locationButton.textContent = 'Pan to Current Location';
//       locationButton.classList.add('custom-map-control-button');
//       map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

//       locationButton.addEventListener('click', () => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//               };

//               infoWindow.setPosition(pos);
//               infoWindow.setContent('Location found.');
//               infoWindow.open(map);
//               map.setCenter(pos);
//             },
//             () => {
//               handleLocationError(true, infoWindow, map.getCenter());
//             }
//           );
//         } else {
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
//       });

//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(
//           browserHasGeolocation
//             ? 'Error: The Geolocation service failed.'
//             : "Error: Your browser doesn't support geolocation."
//         );
//         infoWindow.open(map);
//       }
//     };

//     // Load the Google Maps script
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     // Attach initMap to the window object so Google Maps can call it
//     window.initMap = initMap;

//     return () => {
//       // Clean up by removing the script when the component unmounts
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div id="map" style={{ height: '400px', width: '100%' }}>
//       {/* Map will be rendered here */}
//     </div>
//   );
// };

// export default MapComponent;
import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    // Load the Google Maps script when the component mounts
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUZ61A_lK8Em8_DQ6kSlGzX-SDBK1lEKg&callback=initMap`;
    script.defer = true;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const options = {
      zoom: 15,
      center: { lat: 9.657770, lng: 80.159210 },
    };
    new window.google.maps.Map(document.getElementById('map'), options);
  };

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default MapComponent;
