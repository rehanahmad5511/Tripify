import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

// Component to display car reservation
function CarReservation({ reservation, onCancel }) {
    const {
        _id,
        vehicle,
        status,
        pickupDate,
        returnDate,
        needDriver,
        totalPrice
    } = reservation;

    const startDate = new Date(pickupDate).toLocaleDateString();
    const endDate = new Date(returnDate).toLocaleDateString();

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold">{`Reservation ID: ${_id}`}</h2>
            <p className="text-gray-600">{`Vehicle: ${vehicle?.name || "Honda"}`}</p>
            <p className="text-gray-600">{`Type: ${vehicle?.type || "City"}`}</p>
            <p className="text-gray-600">{`Status: ${status}`}</p>
            <p className="text-gray-600">{`Pickup: ${startDate}`}</p>
            <p className="text-gray-600">{`Return: ${endDate}`}</p>
            <p className="text-gray-600">{`Driver Included: ${needDriver ? "Yes" : "No"}`}</p>
            <p className="text-gray-600 mb-5">{`Total Price: ${totalPrice}`}</p>
            <button
                onClick={() => onCancel(_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                Cancel
            </button>
        </div>
    );
}

// ✅ Component to display tour reservation WITH delete functionality
function TourReservation({ reservation, onDelete }) {
    const {
        _id,
        firstName,
        lastName,
        date,
        phone,
        guestCount,
        currentUser
    } = reservation;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-bold">{`Reservation ID: ${_id}`}</h2>
            <p className="text-gray-600">{`Name: ${firstName} ${lastName}`}</p>
            <p className="text-gray-600">{`Date: ${new Date(date).toLocaleDateString()}`}</p>
            <p className="text-gray-600">{`Phone: ${phone}`}</p>
            <p className="text-gray-600">{`Guests: ${guestCount}`}</p>
            <p className="text-gray-600">{`User ID: ${currentUser}`}</p>
            {/* ✅ Delete Button */}
            <button
                onClick={() => onDelete(_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-3"
            >
                Delete
            </button>
        </div>
    );
}

function ReservationPage() {
    const [activeTab, setActiveTab] = useState("car");
    const [carReservations, setCarReservations] = useState([]);
    const [tourReservations, setTourReservations] = useState([]);

    // Fetching car reservations from localStorage
    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem("carReservations")) || [];
        setCarReservations(storedReservations);
    }, []);

    // Fetching tour reservations from backend
    useEffect(() => {
        const fetchTourReservations = async () => {
            try {
                const response = await axios.get("/tours/tourReservations");
                setTourReservations(response.data);
            } catch (error) {
                console.error("Error fetching tour reservations:", error);
            }
        };
        fetchTourReservations();
    }, []);

    // Function to cancel a car reservation
    const cancelCarReservation = (reservationId) => {
        const updatedReservations = carReservations.filter((r) => r._id !== reservationId);
        setCarReservations(updatedReservations);
        localStorage.setItem("carReservations", JSON.stringify(updatedReservations));
    };

    // ✅ Function to delete a tour reservation
    const deleteTourReservation = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tour reservation?");
        if (!confirmDelete) return;
    
        console.log("Deleting reservation ID:", id);
    
        try {
            const response = await axios.delete(`/tours/tourReservations/${id}`);
            if (response.status === 200) {
                setTourReservations(prev => prev.filter(r => r._id !== id));
                alert("Reservation deleted successfully");
            } else {
                alert("Failed to delete reservation");
            }
        } catch (error) {
            console.error("Error deleting tour reservation:", error);
            alert("An error occurred while deleting the reservation.");
        }
    };

    return (
        <>
            <div className="bg-[#DEEFFF] flex items-center justify-between w-full flex-col lg:flex-row">
                <div className="p-8 pt-5 md:p-24 md:pt-5 lg:p-5">
                    <h1 className="text-3xl font-bold uppercase text-[#272727]">
                        My <span className="text-[#41A4FF]">Reservations</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto py-6 px-6">
                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab("car")}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                            activeTab === "car" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        Car
                    </button>
                    <button
                        onClick={() => setActiveTab("tour")}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                            activeTab === "tour" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        Tour
                    </button>
                    <Link
                        to="/train/MyTickets"
                        className={`px-4 py-2 rounded-lg font-semibold ${
                            activeTab === "train" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        Train
                    </Link>
                </div>

                {/* Content */}
                {activeTab === "car" ? (
                    carReservations.length === 0 ? (
                        <p>No car reservations found.</p>
                    ) : (
                        carReservations.map((reservation) => (
                            <CarReservation
                                key={reservation._id}
                                reservation={reservation}
                                onCancel={cancelCarReservation}
                            />
                        ))
                    )
                ) : activeTab === "tour" ? (
                    tourReservations.length === 0 ? (
                        <p>No tour reservations found.</p>
                    ) : (
                        tourReservations.map((reservation) => (
                            <TourReservation
                                key={reservation._id}
                                reservation={reservation}
                                onDelete={deleteTourReservation}
                            />
                        ))
                    )
                ) : (
                    <p>Train reservations will be displayed here.</p> // Placeholder for Train tab
                )}
            </div>
        </>
    );
}

export default ReservationPage;
