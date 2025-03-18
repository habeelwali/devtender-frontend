import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRequest, removeRequest } from "../utils/requestSlice";
import { setConnections } from "../utils/connectionSlice";

function ConnectedUser() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getConnectedUsers = useSelector((state) => state.connection);
  console.log("getConnectedUsers", getConnectedUsers);

  const getConnectedUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(setConnections(response?.data?.data));
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getConnectedUser();
  }, []);

  const updateRequestStatus = async (newStatus, connectionId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/request/review/${newStatus}/${connectionId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(connectionId));

      //   setStatus(newStatus);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // if (getConnectedUsers.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center h-[80vh]">
  //       <h1>No more request</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="px-10">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Connected User
        </li>
        {getConnectedUsers?.map((user) => (
          <li
            key={user._id}
            className="list-row flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={user?.photoUrl?.imageUrl}
                  alt="User"
                />
              </div>
              <div>
                <div>
                  {user?.firstname} {user?.lastname}
                </div>
                <div className="flex  justify-center items-center">
                  {user?.skills?.map((skill) => (
                    <div className="text-xs  uppercase font-semibold opacity-60  ">
                      <span className="ps-0 px-2">{skill}, </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="btn bg-green-400 cursor-default
                "
              >
                Connected
              </button>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectedUser;
