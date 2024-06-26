import axios from "axios";
import React, { useEffect, useState } from "react";
import { TextField, IconButton, Stack, Pagination } from "@mui/material";
import {
  PauseCircleFilledOutlined,
  PlayArrowOutlined,
  PlayArrowRounded,
  Search,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { DNA } from "react-loader-spinner";
import AddAudioDialog from "../../modals/AddAudioModal";

const AudioFiles = ({ accessToken }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audio, setAudio] = useState(null);

  const [expandedCardId, setExpandedCardId] = useState("");
  const [playAudio, setPlayAudio] = useState(false);
  const [fetchingUrl, setFetchingUrl] = useState(false);

  useEffect(() => {
    const filtered = audioFiles.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [audioFiles, searchTerm]);

  const fetchAudio = async (id) => {
    try {
      setFetchingUrl(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `https://api.wxcc-us1.cisco.com/organization/69fc3aba-280a-4f8e-b449-2c198d78569b/audio-file/${id}?includeUrl=true`,
        {
          headers: headers,
        }
      );
      const url = response.data.url;

      setAudioUrl(url);
      setAudio(new Audio(url));
      audio.src = url;

      setFetchingUrl(false);
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setFetchingUrl(false);
    }
  };

  const toggleAudioPlay = (playAudio) => {
    if (playAudio) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlayAudio(!playAudio);
  };

  // play and pause the audio

  const sortAudioFiles = async () => {
    setLoading(true);
    try {
      const url =
        "https://api.wxcc-us1.cisco.com/organization/69fc3aba-280a-4f8e-b449-2c198d78569b/v2/audio-file?pageSize=10000";
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(url, { headers: headers });
      const data = response.data.data;
      const sortedData = data.sort(
        (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
      );
      setAudioFiles(sortedData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="w-full relative pb-12   ">
        <div className="w-full bg-shade1 px-5 fixed top-0 py-2   ">
          <div className="flex ">
            <div className="bg-slate-100 inline-block rounded-md">
              {" "}
              <TextField
                placeholder="Search queue..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </div>
            <AddAudioDialog
              audioFiles={audioFiles}
              sortAudioFiles={sortAudioFiles}
            />
          </div>
        </div>

        <div className=" flex flex-wrap  gap-2  mt-16 px-7   ">
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
            currentItems.map((item) => (
              <motion.div
                exit={{ x: 1000, opacity: 0 }}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                className="rounded-md shadow-md p-2 w-[400px]   "
              >
                <motion.div
                  onClick={() => {
                    setExpandedCardId(item.id);
                    fetchAudio(item.id);
                  }}
                  className="flex justify-between gap-2 cursor-pointer bg-shade1 rounded-full p-2 "
                >
                  <p className="bg-yellow-100  w-[150px] overflow-clip font-semibold rounded-full px-2 py-1">
                    {item.name}{" "}
                  </p>
                  <p className="bg-shade4 text-white rounded-full px-2 py-1 font-semibold ">
                    {new Date(item.createdTime).toLocaleString()}
                  </p>
                </motion.div>
                {expandedCardId === item.id && (
                  <motion.div>
                    {fetchingUrl ? (
                      <DNA />
                    ) : (
                      <div className="p-2">
                        <audio controls className="ml-4">
                          <source src={audioUrl} type="audio/wav" />
                          Your browser does not support the audio element.
                        </audio>
                        {/* <button onClick={() => toggleAudioPlay(playAudio)}>
                          {playAudio ? (
                            <MdOutlinePauseCircle />
                          ) : (
                            <FaRegCirclePlay />
                          )}
                        </button> */}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>

        <div className="w-full fixed bottom-[40px] pr-[10rem] py-2 bg-slate-200 flex justify-center items-center">
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default AudioFiles;
