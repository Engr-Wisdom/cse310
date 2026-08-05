import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getHotelById } from "../api/hotelApi";
import { createBooking } from "../api/bookingApi";
import { useAuth } from "../context/AuthContext";

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string;
}

const Booking = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [hotel, setHotel] = useState<Hotel | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await getHotelById(Number(id));

        setHotel(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    try {
      await createBooking({
        userId: user.id,
        hotelId: hotel!.id,
        hotelName: hotel!.name,
        image: hotel!.image,
        location: hotel!.location,
        checkIn,
        checkOut,
        guests,
        totalPrice: hotel!.price,
        status: "Pending",
      });

      alert("Booking successful.");

      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex h-screen items-center justify-center">
        Hotel not found.
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-5 pt-32 lg:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-[350px] w-full rounded-2xl object-cover"
          />

          <h1 className="mt-6 text-3xl font-bold">
            {hotel.name}
          </h1>

          <p className="mt-2 text-gray-500">
            {hotel.location}
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            ${hotel.price} / night
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block">
                Check-in
              </label>

              <input
                type="date"
                value={checkIn}
                onChange={(e) =>
                  setCheckIn(e.target.value)
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Check-out
              </label>

              <input
                type="date"
                value={checkOut}
                onChange={(e) =>
                  setCheckOut(e.target.value)
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Guests
              </label>

              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) =>
                  setGuests(Number(e.target.value))
                }
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="mt-8 rounded-lg bg-gray-800 px-8 py-3 text-white"
          >
            Confirm Booking
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;