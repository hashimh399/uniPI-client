// import React from "react";
// import MediaCard from "../../components/TempletsCard";
// import { motion } from "framer-motion";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// const Templets = () => {
//   const cards = [

//      {
//       title: "Banking",
//       image:
//         "https://images.unsplash.com/photo-1591033594798-33227a05780d?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       surveyFor: "Three questions",
//       audioFiles: ["Q1_audio_file.mp3", "Q2_audio_file.mp3", "Q3_audio_file.mp3"]
//     },
//       {
//       title: "Banking",
//       image:
//         "https://images.unsplash.com/photo-1591033594798-33227a05780d?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       surveyFor: "Three questions",
//       audioFiles: ["Q1_audio_file.mp3", "Q2_audio_file.mp3", "Q3_audio_file.mp3"]
//     },

//       {
//       title: "Banking",
//       image:
//         "https://images.unsplash.com/photo-1591033594798-33227a05780d?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       surveyFor: "Three questions",
//       audioFiles: ["Q1_audio_file.mp3", "Q2_audio_file.mp3", "Q3_audio_file.mp3"]
//     },

//       {
//       title: "Banking",
//       image:
//         "https://images.unsplash.com/photo-1591033594798-33227a05780d?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       surveyFor: "Three questions",
//       audioFiles: ["Q1_audio_file.mp3", "Q2_audio_file.mp3", "Q3_audio_file.mp3"]
//     },

//   ];

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="mt-5">
//       <React.Fragment>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           PaperProps={{
//             component: "form",
//             onSubmit: (event) => {
//               event.preventDefault();
//               const formData = new FormData(event.currentTarget);
//               const formJson = Object.fromEntries(formData.entries());
//               const email = formJson.email;
//               console.log(email);
//               handleClose();
//             },
//           }}
//         >
//           <DialogTitle>Export new Flow</DialogTitle>
//           <DialogContent>
//             <DialogContentText>Export new flow.</DialogContentText>
//             <TextField
//               autoFocus
//               required
//               margin="dense"
//               id="name"
//               name="email"
//               label="Email Address"
//               type="email"
//               fullWidth
//               variant="standard"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button type="submit">Export</Button>
//           </DialogActions>
//         </Dialog>
//       </React.Fragment>
//       <div className="flex gap-3 pr-6    ">
//         {cards.map((card, index) => (
//           <motion.div
//             className="w-full"
//             transition={{ duration: 0.5 }}
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <MediaCard
//               image={card.image}
//               queueName={card.title}
//               surveyFor={card.surveyFor}
//               handleClickOpen={handleClickOpen}
//             />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Templets;

// ********************************************************************************

import React, { useState, useEffect } from "react";
import MediaCard from "../../components/TempletsCard";
import { motion } from "framer-motion";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import sampleAudio from "../../assets/audio.wav";
import { OutlinedInput } from "@mui/material";
import { InputLabel, Select, MenuItem } from "@mui/material";
import consiliumLogo from "../../assets/consiliumLogo.png";
const Templets = ({ accessToken }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [entryPoint, setEntryPoint] = useState("");
  const [currentCardDetails, setCurrentCardDetails] = useState(null);
  const [data, setData] = useState();
  const [response, setResponse] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const fetchData = async () => {
    try {
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
      console.log("RECEIVED DATA IS", response.data.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const queues = [];

  const handleClickOpen = (cardDetails) => {
    setCurrentCardDetails(cardDetails);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //queue change

  const handleQueueChange = (event) => {
    setSelectedQueue(event.target.value);
  };

  // entryPoint select
  const handleEntryPointChange = (event) => {
    setEntryPoint(event.target.value);
  };

  const handleExport = () => {
    //sending queue name to backend
    postQueue();

    console.log("Exporting flow for queue:", selectedQueue);

    // handleClose();
  };

  //   *************************************************************

  //posting the queue name

  const postQueue = async () => {
    try {
      setPostLoading(true);
      const apiUrl = "https://d7d8-119-82-64-26.ngrok-free.app/ivr/queue";

      const requestBody = {
        queueName: selectedQueue,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: headers,
      });

      setResponse(response);
      setPostLoading(false);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  // ****************************************************************
  // *************************************************

  const handleSendEntryPoint = () => {
    setResponse(null);
    setSelectedQueue("");
    setEntryPoint("");
    handleClose();
  };

  // ********************************************
  const cards = [
    {
      title: "Operations",
      tootlip: "info",

      info: "Welcome to our Operations Survey Service! We specialize in facilitating smooth and efficient surveys tailored to your operational needs. From optimizing survey distribution to analyzing results, our dedicated team ensures a seamless process from start to finish. ",
      image:
        "https://img.freepik.com/free-vector/pull-request-concept-illustration_114360-5386.jpg?t=st=1716279687~exp=1716283287~hmac=6eb52d9d0a0589f23d73da77ff861accf08a176a239b4c2642727dd3b374915f&w=1060",
      surveyFor: "3 Questions",
      audioFiles: [`${sampleAudio}`, `${sampleAudio}`, `${sampleAudio}`],
    },
    {
      title: "Management ",
      tootlip: "info",
      info: "Welcome to our Survey Management Service! We specialize in helping businesses conduct efficient and insightful surveys.",
      image:
        "https://img.freepik.com/free-vector/research-paper-concept-illustration_114360-8122.jpg?t=st=1716279563~exp=1716283163~hmac=f9636f4bd0bf2e8ec53a93f930d0ab204f8537a2868fe5c5c9053bf87d72ee41&w=740",
      surveyFor: "3 Questions",
      audioFiles: [
        "Q1_audio_file.mp3",
        "Q2_audio_file.mp3",
        "Q3_audio_file.mp3",
      ],
    },
    {
      title: "Accounts",
      tootlip: "info",
      info: "Introducing our Account Survey Service! We provide comprehensive support for your survey needs, ensuring accurate data collection and analysis. ",
      image: `https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg?t=st=1716279471~exp=1716283071~hmac=06f787387aa22d371994104ef3fac07d9b56bb2772031c52ce930b43a77e7eba&w=900`,
      surveyFor: "3 Questions",
      audioFiles: [
        "Q1_audio_file.mp3",
        "Q2_audio_file.mp3",
        "Q3_audio_file.mp3",
      ],
    },
  ];

  return (
    <div className="mt-5 px-7 ">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                handleExport();
              },
            }}
          >
            {response && response.status && response.status === 200 ? (
              postLoading ? (
                <DialogContent>loading...</DialogContent>
              ) : (
                <>
                  <DialogContent
                    style={{ minWidth: "500px", minHeight: "100px" }}
                  >
                    Please the Entry Point
                  </DialogContent>
                  <div className="px-3 -pt-3">
                    <TextField
                      select
                      autoFocus
                      label="Entey Point"
                      value={entryPoint}
                      onChange={handleEntryPointChange}
                      fullWidth
                      required
                    >
                      {console.log("hi", response)}
                      {response &&
                        response.data.mappedData &&
                        response.data.mappedData.map((data, index) =>
                          response.data.mappedData.length !== 0 ? (
                            <MenuItem key={index} value={data?.entryPointName}>
                              {" "}
                              {data?.entryPointName}
                            </MenuItem>
                          ) : (
                            <p className="text-center font-semibold ">
                              NO data found{" "}
                            </p>
                          )
                        )}
                    </TextField>
                    <div className=" flex flex-col gap-1 mt-3 bg-green-200 py-2 rounded-md px-3 font-semibold text-md  ">
                      <p className="text-shade2">
                        Dial Number for{" "}
                        <span className="font-bold">{entryPoint}</span>
                      </p>
                      <motion.p
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="bg-shade2 text-white px-2 py-1 rounded-md"
                      >
                        {response &&
                          response.data.mappedData &&
                          response.data.mappedData.find(
                            (data) => data.entryPointName === entryPoint
                          )?.DialNumber}
                      </motion.p>
                    </div>
                  </div>

                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSendEntryPoint}>Export</Button>
                  </DialogActions>
                </>
              )
            ) : loading ? (
              <>
                <DialogContent>Loading...</DialogContent>
              </>
            ) : (
              <>
                <DialogTitle>Export new Flow</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {" "}
                    {currentCardDetails?.title}{" "}
                  </DialogContentText>

                  <TextField
                    select
                    autoFocus
                    label="Selected Queue"
                    value={selectedQueue}
                    onChange={handleQueueChange}
                    fullWidth
                    required
                    margin="dense"
                  >
                    {data.map((queueName) =>
                      loading ? (
                        <div>loading...</div>
                      ) : data.length !== 0 ? (
                        <MenuItem key={queueName?.name} value={queueName?.name}>
                          {" "}
                          {queueName?.name}
                        </MenuItem>
                      ) : (
                        <p className="text-center font-semibold ">
                          NO data found{" "}
                        </p>
                      )
                    )}
                  </TextField>

                  {currentCardDetails?.audioFiles?.map((audioUrl, index) => (
                    <div key={index} className="flex gap-2 items-center p-2">
                      <h1>Q{index + 1}. Audio</h1>
                      {console.log("AUDIO URL ", audioUrl)}
                      <audio controls>
                        <source src={audioUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Export</Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </React.Fragment>
      </motion.div>
      <div className="flex gap-3 flex-wrap  pr-6">
        {cards.map((card, index) => (
          <motion.div
            className=" w-[300px]  "
            key={index}
            transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, shadow: 2 }}
          >
            <MediaCard
              image={card.image}
              queueName={card.title}
              surveyFor={card.surveyFor}
              audioFiles={card.audioFiles}
              info={card.info}
              handleClickOpen={() => handleClickOpen(card)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Templets;
