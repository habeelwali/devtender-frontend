import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";

const CardSwiper = () => {
  const feed = useSelector((state) => state.feed);
  console.log("feed", feed);

  const [cardList, setCardList] = useState(feed);
  const [swipedCard, setSwipedCard] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCardList(feed);
  }, [feed]); // Reinitialize when new cards arrive

  const handleSwipe = async (direction, id) => {
    setSwipedCard(id);
    setSwipeDirection(direction); // Set swipe direction for animation

    if (direction === "right") {
      console.log("id", id);

      await axios.post(
        `${BASE_URL}/request/send/interested/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));

      console.log(`✅ Interested in card ${id}`);
    } else if (direction === "left") {
      await axios.post(
        `${BASE_URL}/request/send/ignored/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
      console.log(`❌ Ignored card ${id}`);
    }

    // Remove card after animation
    setTimeout(() => {
      setCardList((prev) => prev.filter((card) => card._id !== id));
      setSwipedCard(null);
      setSwipeDirection(null);
    }, 500);
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      {cardList && cardList?.length > 0 ? (
        cardList?.map((card, index) => (
          <motion.div
            key={card._id}
            className="absolute top-20 w-64 h-96 bg-white shadow-lg rounded-xl flex flex-col justify-center items-center p-4"
            initial={{ opacity: 1, scale: 1, x: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            whileDrag={{ rotate: index % 2 === 0 ? -10 : 10 }}
            animate={
              swipedCard === card._id
                ? swipeDirection === "right"
                  ? { x: 500, opacity: 0, rotate: 20 }
                  : { x: -500, opacity: 0, rotate: -20 }
                : { x: 0, opacity: 1, scale: 1 - index * 0.05 }
            }
            transition={{ duration: 0.5 }}
            onDragEnd={(event, info) => {
              if (info.offset.x > 100) {
                handleSwipe("right", card._id);
              } else if (info.offset.x < -100) {
                handleSwipe("left", card._id);
              }
            }}
            style={{
              zIndex: cardList.length - index, // Ensure top card is on top
            }}
          >
            <img
              src={card?.photoUrl?.imageUrl}
              alt="Card"
              className="w-full h-2/3 object-cover rounded-lg"
              style={{ pointerEvents: "none" }} // Prevents the image from blocking the drag
            />
            <h2 className="text-lg font-semibold mt-4">{card.firstname}</h2>
            <p className="text-gray-500">{card.lastname}</p>
          </motion.div>
        ))
      ) : (
        <h2 className="text-2xl font-semibold">No more cards!</h2>
      )}
    </div>
  );
};

export default CardSwiper;
