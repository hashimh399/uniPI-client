import axios from "axios";
import React, { useEffect, useState } from "react";

const AudioFiles = ({ accessToken }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState();
  const fetchAudioFiles = async () => {
    try {
      const url =
        "https://api.wxcc-us1.cisco.com/organization/69fc3aba-280a-4f8e-b449-2c198d78569b/v2/audio-file";
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(url, { headers: headers });
      console.log(response);
      setAudioFiles(response);
      setLoading(false);
    } catch (err) {
      console.log("error fetching audio files:", err);
    }
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  return (
    <div>
      <p>Audio Files</p>
    </div>
  );
};

export default AudioFiles;
