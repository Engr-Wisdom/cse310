import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";

import { getBookingsByUser, type Booking } from "../api/bookingApi";

const MyBookings = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const data = await getBookingsByUser(user.id);

        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [user]);

  const handlePayment = (bookingId: number) => {
    alert(`Payment started for booking ${bookingId}`);

    // Later connect payment gateway here
  };

  return (
    <div>
      <Navbar />

      <div
        className="
        min-h-screen
        bg-gray-100
        px-5
        py-32
        lg:px-20
        "
      >
        <div className="mb-10">
          <h1
            className="
            text-4xl
            font-bold
            text-gray-800
            "
          >
            My Bookings
          </h1>

          <p
            className="
            mt-3
            max-w-3xl
            text-gray-500
            "
          >
            Easily manage your past, current, and upcoming hotel reservations in
            one place. Plan your trips seamlessly with just a few clicks.
          </p>
        </div>

        {loading ? (
          <div
            className="
              rounded-xl
              bg-white
              p-8
              text-center
              "
          >
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div
            className="
              rounded-xl
              bg-white
              p-8
              shadow-md
              "
          >
            <h2
              className="
                text-xl
                font-semibold
                "
            >
              No bookings found.
            </h2>

            <button
              onClick={() => navigate("/hotels")}
              className="
                mt-5
                rounded-lg
                bg-gray-800
                px-6
                py-3
                text-white
                "
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          <div
            className="
              overflow-x-auto
              rounded-2xl
              bg-white
              shadow-md
              "
          >
            <table
              className="
                w-full
                "
            >
              <thead
                className="
                  bg-gray-100
                  "
              >
                <tr>
                  <th
                    className="
                      p-6
                      text-left
                      "
                  >
                    Hotels
                  </th>

                  <th
                    className="
                      p-6
                      text-left
                      "
                  >
                    Date & Timing
                  </th>

                  <th
                    className="
                      p-6
                      text-left
                      "
                  >
                    Payment
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="
                        border-b
                        "
                  >
                    {/* HOTEL */}

                    <td
                      className="
                          p-6
                          "
                    >
                      <div
                        className="
                            flex
                            items-center
                            gap-5
                            "
                      >
                        <img
                          src={booking.image}
                          alt={booking.hotelName}
                          className="
                              h-50
                              w-70
                              rounded-xl
                              object-cover
                              "
                        />

                        <div>
                          <h2
                            className="
                                text-lg
                                font-bold
                                "
                          >
                            {booking.hotelName} (Single Bed)
                          </h2>

                          <p
                            className="
                                mt-2
                                text-gray-500
                                "
                          >
                            {booking.location}
                          </p>

                          <p
                            className="
                                mt-3
                                "
                          >
                            Guests: {booking.guests}
                          </p>

                          <p
                            className="
                                mt-2
                                text-lg
                                font-bold
                                "
                          >
                            Total: ${booking.totalPrice}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DATE */}

                    <td
                      className="
                          p-6
                          "
                    >
                      <div
                        className="
                            flex
                            gap-10
                            "
                      >
                        <div>
                          <p
                            className="
                                font-semibold
                                "
                          >
                            Check-In
                          </p>

                          <p
                            className="
                                mt-2
                                text-gray-600
                                "
                          >
                            {booking.checkIn}
                          </p>
                        </div>

                        <div>
                          <p
                            className="
                                font-semibold
                                "
                          >
                            Check-Out
                          </p>

                          <p
                            className="
                                mt-2
                                text-gray-600
                                "
                          >
                            {booking.checkOut}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PAYMENT */}

                    <td
                      className="
                          p-6
                          "
                    >
                      {booking.status === "Confirmed" ? (
                        <span
                          className="
                                rounded-full
                                bg-green-100
                                px-5
                                py-2
                                text-green-700
                                font-semibold
                                "
                        >
                          Confirmed
                        </span>
                      ) : (
                        <div
                          className="
                                space-y-4
                                "
                        >
                          {/* <span
                            className="
                                  rounded-full
                                  bg-red-100
                                  px-5
                                  py-2
                                  text-red-700
                                  font-semibold
                                  "
                          >
                            Pending
                          </span> */}

                          <button
                            onClick={() => handlePayment(booking.id)}
                            className="
                                  block
                                  rounded-lg
                                  bg-gray-800
                                  px-6
                                  py-2
                                  text-white
                                  hover:bg-gray-700
                                  "
                          >
                            Booked
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;
