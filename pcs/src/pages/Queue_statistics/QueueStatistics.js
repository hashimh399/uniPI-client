import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { DNA } from "react-loader-spinner";
import axios from "axios";
import noData from "../../assets/no_data.jpg";
import "../../styles/queue.css";
import loadingImage from "../../assets/consiliumSymbol.png";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const QueueStatistics = ({ accessToken, agentData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQueue, setExpandedQueue] = useState(null); // State to track expanded queue
  console.log(agentData?.orgId);

  const fetchData = async () => {
    try {
      const date = new Date();
      const to = date.getTime();
      const from = date.getTime() - 24 * 60 * 60 * 1000;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(
        `https://api.wxcc-us1.cisco.com/v1/queues/statistics?from=${from}&to=${to}&orgId=69fc3aba-280a-4f8e-b449-2c198d78569b`,
        {
          headers: headers,
        }
      );

      setData(response.data.data);
      setLoading(false);
      console.log("RECEIVED DATA IS", response.data.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const queueWiseData = {};

  data.forEach((item) => {
    const { queueId } = item;

    if (queueWiseData.hasOwnProperty(queueId)) {
      queueWiseData[queueId].push(item);
    } else {
      queueWiseData[queueId] = [item];
    }
  });

  // console.log("Team wise data is ", queueWiseData);

  // Function to handle motion div click
  const handleMotionDivClick = (queueId) => {
    setExpandedQueue(queueId === expandedQueue ? null : queueId);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-60px)]  flex justify-center items-center">
          <DNA
            visible={true}
            height="130"
            width="130"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <div className="mt-5   ">
          <Outlet context={[data, loading]} />
        </div>
      )}
    </>
  );
};

export default QueueStatistics;
