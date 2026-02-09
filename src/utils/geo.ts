import * as THREE from 'three';

export const LOCATIONS = [
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, region: "HQ" },
  { name: "New York", lat: 40.7128, lon: -74.0060, region: "Hub" },
  { name: "London", lat: 51.5074, lon: -0.1278, region: "Hub" },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, region: "Hub" },
  { name: "Berlin", lat: 52.5200, lon: 13.4050, region: "Server" },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, region: "Remote" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, region: "Remote" },
  { name: "Kampala", lat: 0.3476, lon: 32.5825, region: "Server" },
  { name: "Nairobi", lat: -1.2921, lon: 36.8219, region: "Storage" },
  { name: "Khartoum", lat: 15.5007, lon: 32.5599, region: "Node" },
  { name: "Ankara", lat: 39.9334, lon: 32.8597, region: "Node" },
];

// Convert Lat/Lon to 3D Vector on a sphere of radius R
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

// Convert Lat/Lon to 2D Plane coordinates (Equirectangular)
export function latLonToVector2(lat: number, lon: number, width: number, height: number): THREE.Vector3 {
  const x = (lon / 180) * (width / 2);
  const y = (lat / 90) * (height / 2);
  return new THREE.Vector3(x, y, 0);
}
