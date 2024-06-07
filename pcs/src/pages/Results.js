import React, { useState } from "react";
import ResultCard from "../components/ResultCard";
import ReactSpeedometer from "react-d3-speedometer";
import { Speed } from "@mui/icons-material";
import { TextField, MenuItem } from "@mui/material";
import GaugeChart from "react-gauge-chart";
import { motion } from "framer-motion";

function Results() {
  const menuItem = [
    { name: "UniRSM" },
    { name: "uniQM" },
    {
      name: "uniAgent",
    },
  ];

  const [liveSurvey, setLiveSurvey] = useState("");
  const chartStyle = {
    width: 80,
  };
  return (
    <>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="  px-7 py-2 bg-slate-100"
      >
        {/* header */}
        <div className="w-full bg-slate-300 px-6 py-4 text-white rounded-md flex justify-between  mt-3 ">
          {" "}
          <div className="flex justify-between items-start w-[50%]  gap-4">
            <img
              src="http://localhost:3000/static/media/consiliumSymbol.05461c94a5102cf53589.png"
              alt="company logo"
              width="60px"
              height="60px"
            ></img>
            <div>
              <p className="text-slate-600">
                Lorem Ipsum Inc. is a leading provider of innovative solutions
                in the tech industry. With a team of skilled professionals,
              </p>
            </div>
          </div>
          {/* badge */}
          <div className="flex flex-col items-center gap-4   ">
            <div className=" w-full bg-slate-800 flex     rounded-md items-center p-2  shadow-inner  ">
              <GaugeChart
                style={chartStyle}
                fontSize="15px"
                id="gauge-chart5"
                arcsLength={[0.3, 0.5, 0.2]}
                colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                percent={0.37}
                needleColor="#FFFFFF"
                arcPadding={0.02}
              />
              <p className="font-semibold text-center text-lg  text-slate-100   rounded-md px-2 py-1  ">
                Service Level
              </p>
            </div>

            <div className="flex gap-3">{/* badges */}</div>
          </div>
        </div>
        <div className="bg-slate-200 rounded-md mt-4 px-4 py-2">
          <div className="mt-3  flex   ">
            {" "}
            <TextField
              select
              variant="standard"
              label="Live Surveys"
              value={liveSurvey}
              sx={{ width: 250 }}
              onChange={(e) => setLiveSurvey(e.target.value)}
              required
            >
              {menuItem.map((data, index) =>
                menuItem.length !== 0 ? (
                  <MenuItem key={index} value={data?.name}>
                    {" "}
                    {data?.name}
                  </MenuItem>
                ) : (
                  <p className="text-center font-semibold ">NO data found </p>
                )
              )}
            </TextField>
          </div>

          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            <ResultCard />
            <ResultCard />
            <ResultCard />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Results;
