export function calculateInitialRegion(item) {
  let latSum = 0;
  let lonSum = 0;
  let maxLat = -90;
  let minLat = 90;
  let maxLon = -180;
  let minLon = 180;

  if (item.locations.length === 0) {
    return {
      latitude: 51.133481,
      longitude: 10.018343,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  }

  for (location of item.locations) {
    latSum += location.latitude;
    lonSum += location.longitude;
    maxLat = Math.max(maxLat, location.latitude);
    maxLon = Math.max(maxLon, location.longitude);
    minLat = Math.min(minLat, location.latitude);
    minLon = Math.min(minLon, location.longitude);
  }

  let initialLat = latSum / item.locations.length;
  let initialLon = lonSum / item.locations.length;
  return {
    latitude: initialLat,
    longitude: initialLon,
    latitudeDelta: maxLat - minLat + 0.02,
    longitudeDelta: maxLon - minLon + 0.02,
  };
}
