import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CustomizedTooltips from "./ToolTip";
import Typography from "@mui/material/Typography";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ResultCard({ data, index }) {
  const resultCardInfo = [
    {
      heading: "Net Promoter Score (NPS)",
      text: "Measures customer loyalty by asking how likely customers are to recommend your company to others.",
    },
    {
      heading: "Customer Effort Score (CES)",
      text: "Measures the ease of customer interaction and resolution of their issues.",
    },
    {
      heading: "Customer Satisfaction Score (CSAT)",
      text: "Measures customer satisfaction with a specific interaction or overall service.",
    },
  ];

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent className="flex relative justify-between gap-2">
            <Box className="absolute -top-1 -right-3">
              <CustomizedTooltips resultCardInfo={resultCardInfo[index]} />
            </Box>
            <Box>
              {" "}
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold" }}
                color="text.secondary"
              >
                {data?.name}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: "light" }}>
                {data?.fullName}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ mb: 1.5, width: 70 }} color="text.secondary">
                <CircularProgressbar
                  value={data?.score}
                  maxValue={data.value}
                  text={
                    data.name === "NPS" ? ` ${data?.score}%` : ` ${data?.score}`
                  }
                  background={true}
                  backgroundPadding={6}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "round",

                    // Text size
                    textSize: "16px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(60, 142, 180 )`,
                    textColor: "#FFFFFF",
                    trailColor: "#006191",
                    backgroundColor: "#006191",
                  })}
                />
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ height: 100 }} className="p-2 flex gap-4 w-full   ">
            {/* ****************  promoter score ******************* */}
            {data.promoter && (
              <Box
                sx={{ width: 100 }}
                className="flex flex-col gap-1 text-center items-center "
              >
                <CircularProgressbar
                  value={data?.promoter}
                  maxValue={data.value}
                  text={`${data?.promoter}%`}
                  background={true}
                  backgroundPadding={6}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "round",

                    // Text size
                    textSize: "16px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(166, 140, 238 `,
                    textColor: "#FFFFFF",
                    trailColor: "#672EF6",
                    backgroundColor: "#672EF6",
                  })}
                />
                <Typography sx={{ fontSize: 12 }}>Promoter Score</Typography>
              </Box>
            )}

            {/* ************************  detractoer score ************************* */}

            {data.detractor && (
              <Box
                sx={{ width: 100 }}
                className="flex flex-col gap-1 text-center "
              >
                <CircularProgressbar
                  value={data?.detractor}
                  maxValue={data?.value}
                  text={`${data?.detractor}%`}
                  background={true}
                  backgroundPadding={6}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "round",

                    // Text size
                    textSize: "16px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(166, 140, 238 `,
                    textColor: "#FFFFFF",
                    trailColor: "#672EF6",
                    backgroundColor: "#672EF6",
                  })}
                />
                <Typography sx={{ fontSize: 12 }}>Detractoer Score</Typography>
              </Box>
            )}
          </Box>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </React.Fragment>
      </Card>
    </Box>
  );
}
