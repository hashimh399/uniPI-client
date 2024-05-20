import axios from "axios";
import React, { useEffect, useState } from "react";
import { TextField, IconButton, Stack, Pagination } from "@mui/material";
import { Search } from "@mui/icons-material";
import { BiSolidAddToQueue } from "react-icons/bi";
import { motion } from "framer-motion";
import { DNA } from "react-loader-spinner";
import AddAudioDialog from "../../modals/AddAudioModal";

const AudioFiles = ({ accessToken }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);

  useEffect(() => {
    const filtered = audioFiles.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [audioFiles, searchTerm]);

  // fetch and sort audio file
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
      console.log(sortedData);
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
      <div className="w-full relative">
        <div className="w-full bg-shade1 px-5 fixed top-0 py-2 z-10">
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
            {/* <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex items-center justify-between gap-2 cursor-pointer hover:bg-yellow-400 duration-200 bg-yellow-300 pr-3   fixed right-4 rounded-full "
            >
              <div className="bg-yellow-500 flex items-center justify-center h-10 w-10 text-white text-lg rounded-full">
                <BiSolidAddToQueue />
              </div>
              <span className="font-semibold">Add Audio</span>
            </motion.div> */}
            <AddAudioDialog
              audioFiles={audioFiles}
              sortAudioFiles={sortAudioFiles}
            />
          </div>
        </div>

        {/* **********************************************  content ******************************************  */}

        <div className=" flex gap-2 flex-wrap mt-16 px-7">
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
                className="rounded-md shadow-md p-2 w-[400px]"
              >
                <div className="flex justify-between gap-2 bg-shade1 rounded-full p-2 ">
                  <p className="bg-yellow-100  w-[150px] overflow-clip font-semibold rounded-full px-2 py-1">
                    {item.name}{" "}
                  </p>
                  <p className="bg-shade4 text-white rounded-full px-2 py-1 font-semibold ">
                    {new Date(item.createdTime).toLocaleString()}
                  </p>
                </div>
                {/* audio */}
                <div className="w-full flex items-center justify-center mt-4">
                  {/* <audio controls className="ml-4">
                    <source src={item.blobId} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio> */}
                </div>
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
