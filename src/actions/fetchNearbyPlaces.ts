const fetchNearbyPlaces = async (
  lat: number,
  lng: number,
  type: string
): Promise<any[] | null> => {
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const radius = 200;

  const url = `https://places.googleapis.com/v1/places:searchNearby`;
  const body = {
    includedTypes: [type],
    locationRestriction: {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius: radius,
      },
    },
    priceLevels: ["PRICE_LEVEL_INEXPENSIVE", "PRICE_LEVEL_MODERATE"],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_KEY, // Now always a string
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
      } as HeadersInit, // Explicitly cast to HeadersInit
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);

    const data = await response.json();

    const highest_rating = data.places.filter(
      (item: any) => item.rating > 4 && item.userRatingCount > 1000
    );

    return highest_rating || [];
  } catch (error) {
    console.error("Error fetching nearby restaurants:", error);
    return null;
  }
};

export default fetchNearbyPlaces;
