import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import noData from "../assets/no_data.jpg";
import { MdOutlineArrowRight } from "react-icons/md";
import { Audio } from "react-loader-spinner";
import { TextField, IconButton, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

function CreateSurvey({ accessToken }) {
  const [inputTexts, setInputTexts] = useState(["", "", ""]);
  const [loadingStates, setLoadingStates] = useState([false, false, false]);
  const [audioUrls, setAudioUrls] = useState(["", "", ""]);
  const [checkboxStates, setCheckboxStates] = useState([false, false, false]);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [live, setLive] = useState(false);
  const [queueWiseData, setQueueWiseData] = useState({});
  const [openQueue, setOpenQueue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const placeholder = [
    "How would you rate the agent on a scale of 1 to 5?",
    "Is your query resolved?",
    "Will you suggest the survey to your friend?",
  ];

  const toggleQueue = (queueId) => {
    setOpenQueue((prevOpenQueue) =>
      prevOpenQueue === queueId ? null : queueId
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(
        `https://api.wxcc-us1.cisco.com/organization/69fc3aba-280a-4f8e-b449-2c198d78569b/v2/contact-service-queue`,
        {
          headers: headers,
        }
      );

      setData(response.data.data);
      setLoading(false);

      const queueData = {}; // Temporary object to hold queue wise data

      response.data.data.forEach((item) => {
        const { queueId, queueName } = item;
        if (queueData.hasOwnProperty(queueId)) {
          queueData[queueId].push(item);
        } else {
          queueData[queueId] = [item];
        }
      });

      setQueueWiseData(queueData); // Set the queue wise data
      setFilteredData(response.data.data); // Initially set filtered data to all data
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const handleInputChange = (index, value) => {
    const newInputTexts = [...inputTexts];
    newInputTexts[index] = value;
    setInputTexts(newInputTexts);
  };

  const sendPostRequest = async (index) => {
    try {
      // const response = await axios.post(
      //   "https://bcc5-119-82-64-26.ngrok-free.app/tts",
      //   {
      //     text: inputTexts[index],
      //   }
      // );
      // return response.data.url;
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return "https://example.com/audio.wav";
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleTTS = async (index) => {
    setLoadingStates((prevLoadingStates) =>
      prevLoadingStates.map((state, i) => (i === index ? true : state))
    );
    try {
      const audioUrl = await sendPostRequest(index);
      if (audioUrl) {
        const newAudioUrls = [...audioUrls];
        newAudioUrls[index] = audioUrl;
        setAudioUrls(newAudioUrls);
        setActiveInput(index + 1 < inputTexts.length ? index + 1 : activeInput);
      }
    } catch (error) {
      console.error("Error generating TTS:", error);
    } finally {
      setLoadingStates((prevLoadingStates) =>
        prevLoadingStates.map((state, i) => (i === index ? false : state))
      );
    }
  };

  const handleExport = (index) => {
    inputRefs[index].current.disabled = true;
    inputRefs[index].current.value = "";
    inputRefs[index].current.blur(); // Remove focus from the current input

    if (index + 1 < inputTexts.length) {
      setActiveInput(index + 1); // Move to the next input
      inputRefs[index + 1].current.focus(); // Focus on the next input
    } else {
      // If all inputs are exported, reset the state
      setInputTexts(["", "", ""]); // Reset input texts
      setAudioUrls(["", "", ""]); // Reset audio URLs
      setActiveInput(0); // Reset active input to the first one
      setLoadingStates([false, false, false]); // Reset loading states
    }
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);

    if (newCheckboxStates[index]) {
      // Enable the input if checkbox is checked
      inputRefs[index].current.disabled = false;
      setActiveInput(index);
    } else {
      // Disable the input if checkbox is unchecked
      inputRefs[index].current.disabled = true;
      setActiveInput(index + 1);
    }
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSelectedQueue = (queueId) => {
    setOpenQueue(queueId === openQueue ? null : queueId);
  };

  return (
    <div className="containe   relative">
      {/* Search menu */}
      <div className="w-full bg-shade1  fixed top-0  p-4 py-3">
        <div className="bg-slate-200 rounded-md inline-block ">
          <TextField
            placeholder="Search queue..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchInputChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>

      {/* Render queues based on filtered data */}
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
      ) : filteredData.length > 0 ? (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex flex-col gap-2 mt-20 pl-7"
        >
          {filteredData.map((queue, index) => (
            <div
              key={index}
              className="  px-4 cursor-pointer py-2 rounded flex flex-col justify-between  items-start     transition-colors"
            >
              <div
                onClick={() => toggleQueue(queue.name)}
                className="flex gap-2 hover:bg-slate-300 bg-[#d2dbe1] px-3 py-2 rounded-md w-full font-bold text-lg  justify-between"
              >
                <h1>{queue.name}</h1>
                <MdOutlineArrowRight
                  className={`text-xl cursor-pointer transform transition-transform ${
                    openQueue === queue.name ? "rotate-90" : ""
                  }`}
                  onClick={() => toggleQueue(queue.name)}
                />
              </div>

              <motion.div
                animate={{ height: openQueue === queue.name ? "auto" : 0 }}
                transition={{ type: "spring", stiffness: 200, duration: 0.1 }}
                key={queue.name}
                className={`overflow-hidden transition-height w-full rounded-md px-2 pt-2   ${
                  openQueue === queue.name ? "h-auto duration-150" : "h-0"
                }`}
              >
                {/* Render input fields */}
                {inputTexts.map((inputText, index) => (
                  <div
                    key={index}
                    className="mb-2 flex flex-row gap-2 items-center "
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      id={`checkbox${index + 1}`}
                      checked={checkboxStates[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-8 w-8 text-blue-600 rounded border border-gray-300 focus:ring-blue-500"
                    />
                    {/* Input Field */}
                    <input
                      id={`q${index + 1}`}
                      type="text"
                      placeholder={`${placeholder[index]}`}
                      className="border w-2/3 border-gray-400 p-2 rounded"
                      value={inputText}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      ref={inputRefs[index]}
                      disabled={!checkboxStates[index]}
                      autoFocus={activeInput === index}
                    />
                    {/* TTS Button */}
                    <Button
                      className="bg-blue-500 hover:bg-blue-700 flex justify-center items-center max-w-28 duration-300 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleTTS(index)}
                      disabled={
                        !inputText ||
                        loadingStates[index] ||
                        !checkboxStates[index]
                      }
                    >
                      {loadingStates[index] ? (
                        <Audio
                          height="20"
                          width="20"
                          radius="9"
                          color="white"
                          ariaLabel="loading"
                          wrapperStyle
                          wrapperClass
                        />
                      ) : (
                        "TTS"
                      )}
                    </Button>
                    {/* Audio Player */}
                    {audioUrls[index] && (
                      <audio controls className="ml-4">
                        <source src={audioUrls[index]} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    {/* Export Button */}
                    {audioUrls[index] && (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4"
                        onClick={() => handleExport(index)}
                      >
                        Export
                      </button>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
          <img src={noData} width="400px" alt="no data found"></img>
        </div>
      )}
    </div>
  );
}

export default CreateSurvey;

// ***********************************************************************************************************
