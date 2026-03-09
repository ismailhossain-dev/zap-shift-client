import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import L from "leaflet";

// Leaflet default icon fix (karon React e icon haria jay)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Coverage = () => {
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const serviceCenters = useLoaderData() || [];

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14, {
        duration: 2, // Smooth transition
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Nationwide <span className="text-indigo-600">Coverage</span>
        </h2>
        <p className="text-lg text-slate-600">
          We are proudly serving in all 64 districts. Find your nearest service center easily.
        </p>
      </div>

      {/* Search Box Section */}
      <div className="max-w-xl mx-auto mb-8 relative z-[1000]">
        <form onSubmit={handleSearch} className="group">
          <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-indigo-500">
            <div className="pl-5 text-slate-400">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              name="location"
              placeholder="Search your district (e.g. Dhaka, Bogura...)"
              className="w-full py-5 px-4 text-slate-700 outline-none font-medium placeholder:text-slate-400"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 font-bold transition-colors">
              Locate
            </button>
          </div>
        </form>
      </div>

      {/* Map Container */}
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={true}
            ref={mapRef}
            className="h-[600px] w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker key={index} position={[center.latitude, center.longitude]}>
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h3 className="text-lg font-bold text-indigo-700 mb-1">{center.district}</h3>
                    <div className="h-0.5 w-full bg-slate-100 mb-2"></div>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">Coverage:</span>
                      <br />
                      {center.covered_area.join(", ")}
                    </p>
                    <button className="mt-3 w-full bg-indigo-50 text-indigo-600 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">
                      View Hub Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Subtle Overlay Label */}
          <div className="absolute bottom-6 left-6 z-[500] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200 pointer-events-none">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Live Service Centers Map
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
