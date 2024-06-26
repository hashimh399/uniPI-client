import React, { useEffect, useState } from "react";
import { RiWechatFill } from "react-icons/ri";
import "../../styles/voiceSurvey.css";
import noData from "../../assets/no_data.jpg";
import { motion } from "framer-motion";
import {
  TextField,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";

const Chat = () => {
  const [data] = useOutletContext();
  const [loading] = useOutletContext();
  console.log("VOCIE DATA", data);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter data where channelType is "telephony"
    const telephonyData = data.filter(
      (item) => item.channelType.toLowerCase() === "chat"
    );

    // Apply search filter if searchQuery is not empty
    const searchData = telephonyData.filter(
      (item) =>
        item.queueId.includes(searchQuery) ||
        item.queueName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredData(searchData);
  }, [data, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <motion.div className="relative w-full ">
      <div className="w-full px-3 py-2 flex items-center fixed top-0 bg-shade1">
        <div className="flex rounded-full text-shade2 bg-yellow-400 items-center justify-center pl-2 gap-2">
          <h1 className="font-semibold">Chat Queue</h1>
          <span className="rounded-full h-10 w-10 text-2xl bg-yellow-700 flex items-center justify-center">
            <RiWechatFill className="text-white" />
          </span>
        </div>
        <div className="bg-slate-200 rounded-md fixed right-4">
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

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 20 }}
        className="mt-16 table-container  "
      >
        <Table className="custom-table px-7">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Queue Name</TableCell>

              <TableCell> start time</TableCell>
              <TableCell>Service Level Threshold %</TableCell>
              <TableCell>Avg. Enqueued Time</TableCell>
              <TableCell>Avg. Handled Time</TableCell>

              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.queueName}</TableCell>

                  <TableCell>
                    {new Date(item?.intervalStartTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {item.serviceLevelThresholdPercentage.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(item.averageHandledTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.averageHandledTime).toLocaleString()}
                  </TableCell>
                  {/* Add more table cells for other data */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className="flex justify-center "
                  >
                    <img src={noData} alt="no data found" width="300px"></img>
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  );
};

export default Chat;
