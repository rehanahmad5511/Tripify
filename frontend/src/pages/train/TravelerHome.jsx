import React, { useState, useEffect } from "react";
import TrainHero from "../../components/train/TrainHero";
import SearchBar from "../../components/train/SearchBar";
import TrainCard from "../../components/train/TrainCard";
import TrainListheader from "../../components/train/TrainListheader";
import BookTrainAd from "../../components/train/BookTrainAd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TravelerHome = () => {
  const [trains, setTrains] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const getAllTrain = () => {
      axios
        .get("/train/")
        .then((res) => {
          console.log(res.data); // Debugging the response
          setTrains(res.data); // Set trains to state
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getAllTrain();
  }, []);

  const location = useLocation();
  const data = location.state;

  console.log("Received data from location state:", data); // Debug log

  return (
    <div>
      <TrainHero />
      <SearchBar />
      <TrainListheader />
      <div className="md:px-24">
        <div className="flex flex-wrap flex-col md:flex-row lg:mx-16 gap-[30px]">
          {/* Render trains if there are no specific data passed */}
          {data && data.length > 0 ? (
            data.map((item) => (
              <TrainCard
                key={item._id} // Use _id as key for uniqueness
                trainName={item.trainName}
                from={item.from}
                to={item.to}
                arrivalTime={item.arrivalTime}
                depatureTime={item.depatureTime}
                noOfSeats={item.noOfSeats}
                id={item._id}
                price={item.price}
              />
            ))
          ) : (
            // Render trains from API if no data is passed from location.state
            trains.length > 0 ? (
              trains.map((item) => (
                <TrainCard
                  key={item._id} // Use _id as key for uniqueness
                  trainName={item.trainName}
                  from={item.from}
                  to={item.to}
                  arrivalTime={item.arrivalTime}
                  depatureTime={item.depatureTime}
                  noOfSeats={item.noOfSeats}
                  id={item._id}
                  price={item.price}
                />
              ))
            ) : (
              <p>No trains available.</p> // Show a message if no trains are available
            )
          )}
        </div>
      </div>
      <BookTrainAd />
    </div>
  );
};

export default TravelerHome;
