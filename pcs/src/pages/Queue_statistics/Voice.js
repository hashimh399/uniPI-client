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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { Search } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";

const Voice = () => {
  const [data] = useOutletContext();
  const [loading] = useOutletContext();
  console.log("VOCIE DATA", data);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [datevalue, setDateValue] = useState(null);
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
    <div className="relative w-full ">
      <div className="w-full px-3 py-2 flex items-center fixed top-0 bg-shade1">
        <div className="flex rounded-full text-white bg-shade4 items-center justify-center pl-2 gap-2">
          <h1 className="font-semibold">Voice Queue</h1>
          <span className="rounded-full h-10 w-10 text-2xl bg-green-800 flex items-center justify-center">
            <RiChatVoiceFill className="text-white" />
          </span>
        </div>
        <div>
          <DesktopDatePicker
            label="For desktop"
            value={datevalue}
            minDate={new Date("2017-01-01")}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
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

      <div className="mt-16 table-container  ">
        <Table className="custom-table px-7">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Queue Name</TableCell>
              <TableCell>Queue ID</TableCell>
              <TableCell>Interval start time</TableCell>
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
                  <TableCell>{item.queueId}</TableCell>
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
      </div>
    </div>
  );
};

export default Voice;
