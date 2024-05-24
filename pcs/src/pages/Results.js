import React, { useState } from "react";
import ImgMediaCard from "../components/ResultCard";
import ReactSpeedometer from "react-d3-speedometer";
import { Speed } from "@mui/icons-material";
import { TextField, MenuItem } from "@mui/material";
import GaugeChart from "react-gauge-chart";

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
    width: 120,
  };
  return (
    <>
      <div className="w-full px-7 py-2 bg-slate-100">
        {/* header */}
        <div className="w-full bg-slate-300 px-6 py-4 text-white rounded-md flex justify-between  mt-3 ">
          {" "}
          <div className="flex justify-between items-start w-[30%]  gap-4">
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
            <div className=" w-full bg-slate-400 flex flex-col justify-center    rounded-md items-center p-2  shadow-inner  ">
              <GaugeChart
                style={chartStyle}
                fontSize="15px"
                id="gauge-chart5"
                arcsLength={[0.3, 0.5, 0.2]}
                colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                percent={0.37}
                arcPadding={0.02}
              />
              <p className="font-semibold text-center text-lg  text-slate-600   rounded-md px-2 py-1  ">
                Service Level
              </p>
            </div>

            <div className="flex gap-3">
              <img
                src="https://imgs.search.brave.com/n4a2INonUfz0dm7OGiK_wK45c7UqjFi4IWG9e2rbQqg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI1L1VTX0FybXlf/QXZpYXRvcl9CYWRn/ZS5wbmc"
                alt="img"
                width="100px"
                height="40px"
              ></img>
              <img
                src="https://imgs.search.brave.com/E717p8SQqyZv3LCLXo6oRRSin3lirzLWDTjqZT4ieA8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0gvaGFybGV5/LWRhdmlkc29uLW1v/dG9yLWNvbXBhbnkt/bG9nby0xMjZBRTRG/QUIyLXNlZWtsb2dv/LmNvbS5wbmc"
                alt="img"
                width="40px"
                height="40px"
              ></img>
              <img
                src="https://imgs.search.brave.com/qquov38pa4YC-HFo8NpGfWbg11buzutebcF49TIs2d4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0gvaGV3bGV0/dC1wYWNrYXJkLWNv/bXBhbnktbG9nby1G/NTY3NkE0RTE2LXNl/ZWtsb2dvLmNvbS5w/bmc"
                alt="img"
                width="40px"
                height="40px"
              ></img>
            </div>
          </div>
        </div>
        <div className="bg-slate-200 rounded-md mt-4 px-4 py-2">
          <div className="mt-3    flex justify-end  ">
            {" "}
            <TextField
              select
              variant="standard"
              autoFocus
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
            <ImgMediaCard />
            <ImgMediaCard />
            <ImgMediaCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
