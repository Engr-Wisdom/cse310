export interface Booking {
  id: number;

  userId: number;

  hotelId: number;

  hotelName: string;

  image: string;

  location: string;

  checkIn: string;

  checkOut: string;

  guests: number;

  totalPrice: number;

  status: "Confirmed" | "Pending";
}


// Data required when creating a booking
// id is generated automatically by JSON Server

export type CreateBookingData = Omit<
  Booking,
  "id"
>;


const API_URL = "http://localhost:3000/bookings";



// Create Booking

export const createBooking = async (
  bookingData: CreateBookingData
): Promise<Booking> => {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(bookingData),

  });


  if (!response.ok) {

    throw new Error(
      "Failed to create booking"
    );

  }


  const data: Booking =
    await response.json();


  return data;

};





// Get all bookings for a specific user

export const getBookingsByUser = async (
  userId: number
): Promise<Booking[]> => {


  const response = await fetch(
    `${API_URL}?userId=${userId}`
  );


  if (!response.ok) {

    throw new Error(
      "Failed to fetch bookings"
    );

  }


  const data: Booking[] =
    await response.json();


  return data;

};





// Get a single booking by id

export const getBookingById = async (
  id: number
): Promise<Booking | null> => {


  const response = await fetch(
    `${API_URL}/${id}`
  );


  if (!response.ok) {

    return null;

  }


  const data: Booking =
    await response.json();


  return data;

};





// Update booking payment status

export const updateBookingStatus = async (
  id: number,
  status: "Paid" | "Unpaid"
): Promise<Booking> => {


  const response = await fetch(
    `${API_URL}/${id}`,
    {

      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),

    }
  );


  if (!response.ok) {

    throw new Error(
      "Failed to update booking status"
    );

  }


  return response.json();

};