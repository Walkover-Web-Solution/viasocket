// Location detection utility to get user's country based on browser geolocation
export async function detectUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const country = await getCountryFromCoordinates(latitude, longitude);
          resolve(country);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  });
}

// Get country from coordinates using a reverse geocoding service
async function getCountryFromCoordinates(lat, lon) {
  try {
    // Using a free geocoding service (you can replace with your preferred service)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    return data.countryName;
  } catch (error) {
    console.error('Error getting country from coordinates:', error);
    throw error;
  }
}

// Alternative method using IP-based location (fallback)
export async function detectLocationByIP() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch IP location data');
    }
    
    const data = await response.json();
    return data.country_name;
  } catch (error) {
    console.error('Error getting location by IP:', error);
    throw error;
  }
}

// Main function to detect location with fallbacks
export async function detectUserCountry() {
  try {
    // First try geolocation API
    const country = await detectUserLocation();
    return country;
  } catch (geoError) {
    // If user explicitly denied permission, respect that and do NOT fallback to IP-based detection
    // GeolocationPositionError.PERMISSION_DENIED === 1
    if (typeof geoError === 'object' && geoError && geoError.code === 1) {
      console.warn('Geolocation permission denied by user; skipping IP-based detection.');
      return null; // Signal to callers that location is unavailable due to denied permission
    }

    console.warn('Geolocation failed (not due to permission), trying IP-based detection:', geoError?.message || geoError);

    try {
      // Fallback to IP-based location for other errors (e.g., timeout, position unavailable)
      const country = await detectLocationByIP();
      return country;
    } catch (ipError) {
      console.error('Both location methods failed:', ipError.message);
      throw new Error('Unable to detect location');
    }
  }
}
