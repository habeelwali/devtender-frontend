import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import CardSwiper from './CardSwiper';

function Feed() {
    const dispatch = useDispatch();

  

    const getFeed = async()=>{
        try {
            const response  = await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true});
        dispatch(addFeed(response.data.data))
        console.log(response.data);
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        getFeed()
      
    }, [])
    const cardsData = [
        { id: 1, name: "Card 1", image: "https://via.placeholder.com/150", description: "This is card 1" },
        { id: 2, name: "Card 2", image: "https://via.placeholder.com/150", description: "This is card 2" },
        { id: 3, name: "Card 3", image: "https://via.placeholder.com/150", description: "This is card 3" },
      ];
    
  return (
    <div className="flex justify-center flex-col items-center h-screen mt-2 ">
        <h1>If you are intrested swap the card right if not then ignore on left </h1>
    <CardSwiper  />
  </div>
  )
}

export default Feed