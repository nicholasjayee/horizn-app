import * as THREE from 'three';

export const LOCATIONS = [
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, region: "HQ" },
  { name: "New York", lat: 40.7128, lon: -74.0060, region: "Hub" },
  { name: "London", lat: 51.5074, lon: -0.1278, region: "Hub" },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, region: "Hub" },
  { name: "Berlin", lat: 52.5200, lon: 13.4050, region: "Remote" },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, region: "Remote" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, region: "Remote" }
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

// Convert Lat/Lon to 2D Plane coordinates (Mercator-ish projection for visualization)
export function latLonToVector2(lat: number, lon: number, width: number, height: number): THREE.Vector3 {
  // Simple Equirectangular projection mapping
  const x = (lon / 180) * (width / 2);
  const y = (lat / 90) * (height / 2);
  return new THREE.Vector3(x, y, 0);
}