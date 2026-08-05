const API_URL = "http://localhost:3000/hotels";

export interface Hotel {
  id: number;
  name: string;
  address: string;
  location: string;
  image: string;
  price: number;
  reviews: string;
  rate: string;
  amenities: string[];
}

// Get all hotels
export const getHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch hotels.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching hotels:", error);

    return [];
  }
};

// Get a single hotel
export const getHotelById = async (
  id: number,
): Promise<Hotel | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching hotel:", error);

    return null;
  }
};