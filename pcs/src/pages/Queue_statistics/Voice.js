import React, { useEffect, useState } from "react";
import { RiChatVoiceFill } from "react-icons/ri";
import "../../styles/voiceSurvey.css";
import noData from "../../assets/no_data.jpg";
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

const Voice = () => {
  const [data] = useOutletContext();
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter data where channelType is "telephony"
    const telephonyData = data.filter(
      (item) => item.channelType.toLowerCase() === "telephony"
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
    <div className="relative w-full">
      <div className="w-full px-3 py-2 flex items-center fixed top-0 bg-shade1  ">
        <div className="flex rounded-full text-white bg-shade4 items-center justify-center pl-2 gap-2">
          <h1 className="font-semibold">Voice Queue</h1>
          <span className="rounded-full h-10 w-10 text-2xl bg-green-800 flex items-center justify-center">
            <RiChatVoiceFill className="text-white" />
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

      <div className="mt-16 table-container  px-7">
        <Table className="custom-table ">
          <TableHead className=" bg-white">
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Queue Name</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Service Level Threshold</TableCell>
              <TableCell>Assigned Tasks</TableCell>
              <TableCell>Enqueued Tasks</TableCell>
              <TableCell>Rejected Tasks</TableCell>
              <TableCell>Avg. Enqueued Time</TableCell>
              <TableCell>Avg. Handled Time</TableCell>
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
                    {item.serviceLevelThresholdPercentage.toFixed(2)}%
                  </TableCell>
                  <TableCell>{item.totalAssignedTasks}</TableCell>
                  <TableCell>{item.totalEnqueuedTasks}</TableCell>
                  <TableCell>{item.totalRejectedTasks}</TableCell>
                  <TableCell>
                    {new Date(item.averageHandledTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.averageHandledTime).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    className="flex justify-center"
                  >
                    <img src={noData} alt="no data found" width="300px" />
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Voice;
