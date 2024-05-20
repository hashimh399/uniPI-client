import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@mui/material";
import { BiSolidAddToQueue } from "react-icons/bi";
import { Box } from "@mui/material";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { Stack } from "@mui/material";
export default function AddAudioDialog({ audioFiles, sortAudioFiles }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currentAudioFile, setCurrentAudioFile] = useState("");
  const [addInputText, setAddInputText] = useState("");
  const [audioName, setAudioName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioLoading, setAudioLoading] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleAudioFileChange = (e) => {
    setSelectedAudio(e.target.vlaue);
  };

  React.useEffect(() => {
    sortAudioFiles();
    setCurrentAudioFile(audioFiles && audioFiles[0] && audioFiles[0].names);
  }, [audioUrl]);

  const handleCreateNew = () => {
    setAudioUrl("");
    setAddInputText("");
    setCurrentAudioFile("");
  };
  // Send post request for TTS
  const sendPostRequest = async (text, name) => {
    setAudioLoading(true);
    try {
      const response = await axios.post(
        "https://21a9-119-82-64-26.ngrok-free.app/tts",
        { text: text, name: name }
      );
      console.log(response.data.url);
      return response.data.url;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setAudioLoading(false);
    }
  };

  // ***********************************   update audio file  ********************************

  const updateAudioFile = async (name) => {
    setUpdateLoading(true);
    try {
      const response = await axios.post(
        "https://21a9-119-82-64-26.ngrok-free.app/updateaudio",
        {
          audio: name,
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  //   get current details

  const currentDetails = async (req, res) => {
    try {
      const response = await axios.get(
        "https://21a9-119-82-64-26.ngrok-free.app/audio-file-name"
      );
      const audioFileName = response.data; // Save the filename to the global variable
      res.json({ fileName: audioFileName });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    currentDetails();
  }, []);

  const handleTTS = async () => {
    console.log("Text to be converted to speech:", addInputText);
    const audioUrl = await sendPostRequest(addInputText, audioName);
    console.log(audioFiles);
    setAudioUrl(audioUrl);

    sortAudioFiles();
    setCurrentAudioFile(audioFiles && audioFiles[0] && audioFiles[0].name);
  };

  const handleSubmit = async () => {
    const savedAudio = await updateAudioFile(selectedAudio);
    setSelectedAudio("");
    sortAudioFiles();
    console.log(savedAudio);
  };
  return (
    <React.Fragment>
      <motion.div
        onClick={handleClickOpen}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        className="flex items-center justify-between gap-2 cursor-pointer hover:bg-yellow-400 duration-200 bg-yellow-300 pr-3   fixed right-4 rounded-full "
      >
        <div className="bg-yellow-500 flex items-center justify-center h-10 w-10 text-white text-lg rounded-full">
          <BiSolidAddToQueue />
        </div>
        <span className="font-semibold">Add Audio</span>
      </motion.div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();

            handleClose();
          },
        }}
      >
        <DialogTitle>Add audio file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create or select any audio file.
          </DialogContentText>
          <TextField
            sx={{ mb: 1 }}
            disabled
            margin="dense"
            id="name"
            value={currentAudioFile}
            name="currentValue"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            sx={{ mt: 3 }}
            select
            label="Audio File"
            value={selectedAudio}
            onChange={(e) => setSelectedAudio(e.target.value)}
            fullWidth
          >
            {audioFiles &&
              audioFiles.length > 0 &&
              audioFiles?.map((data, index) =>
                audioFiles.length !== 0 ? (
                  <MenuItem key={index} value={data?.name}>
                    {`${index + 1} :-  ${data?.name}`}
                  </MenuItem>
                ) : (
                  <p className="text-center font-semibold ">NO data found</p>
                )
              )}
          </TextField>

          <Box sx={{ mt: 3 }}>
            <TextField
              label="Create Audio"
              id="outlined-size-normal"
              placeholder="Welcome to consilium."
              onChange={(e) => setAddInputText(e.target.value)}
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              label="Audio file Name?"
              id="outlined-size-normal"
              defaultValue=" "
              onChange={(e) => setAudioName(e.target.value + ".wav")}
              fullWidth
            />
            <Stack sx={{ mt: 1 }}>
              {audioUrl && (
                <audio controls className="ml-4">
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </Stack>

            <Button
              sx={{ mt: 1 }}
              variant="outlined"
              className=" "
              onClick={handleTTS}
            >
              {audioLoading ? (
                <Audio
                  height="20"
                  width="20"
                  radius="9"
                  color="blue"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              ) : (
                "TTS"
              )}
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1, ml: 1 }}
              onClick={handleCreateNew}
              disabled={audioUrl === ""}
            >
              Create New Audio
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
