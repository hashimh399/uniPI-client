import React, { useState } from "react";
import ResultCard from "../components/result/ResultCard";
import { useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import GaugeChart from "react-gauge-chart";
import { motion } from "framer-motion";
import LineGraph from "../components/result/LineChart";
import axios from "axios";
function Results({ getAllDetails }) {
  const menuItem = [
    { name: "UniRSM" },
    { name: "uniQM" },
    {
      name: "uniAgent",
    },
  ];

  const [scores, setScores] = useState([]);
  const [scoreNps, setScoreNps] = useState();
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:8000/scores");
        setScores(response.data);
        console.log("RESULT DATA IS ", response.data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  // Count of promoter detractor and passive calculaion

  const countResponses = (scores, question) => {
    const counts = { Detractors: 0, Passive: 0, Promoters: 0 };

    scores.forEach((item) => {
      const value = item[question];
      if (value >= 0 && value <= 6) {
        counts["Detractors"]++;
      } else if (value >= 7 && value <= 8) {
        counts["Passive"]++;
      } else if (value >= 9 && value <= 10) {
        counts["Promoters"]++;
      }
    });

    return counts;
  };

  const question1Counts = countResponses(scores, "question1");
  const question2Counts = countResponses(scores, "question2");
  const question3Counts = countResponses(scores, "question3");

  // ***********************  NPS SCORE **********************************
  const totalSurveyResponse = scores.length;

  const promoterPercentage =
    (question1Counts.Promoters / totalSurveyResponse) * 100;
  const detractorsPercentage =
    (question1Counts.Detractors / totalSurveyResponse) * 100;
  const NPS = promoterPercentage - detractorsPercentage;

  // *****************************  CES CALCULATION ************************************

  const calculateAverage = (data, question) => {
    let total = 0;
    data.forEach((item) => {
      total += item[question];
    });
    return total / data.length;
  };

  const question2Avg = calculateAverage(scores, "question2");

  // ************************ CSAT cALCULATION *************************************

  const CSATCalculation = (data, question) => {
    let total = 0;
    data.forEach((item) => {
      total += item[question];
    });
    return total / data.length;
  };

  const CSAT = CSATCalculation(scores, "question3");

  // ***************** CES  messages ***********************

  const CESMessage = (score) => {
    if (score >= 8)
      return {
        message: (
          <span>
            <strong>Effort level: Low.</strong> Thanks for the positive
            feedback, we're glad our process is working well.
          </span>
        ),
        emoji: "😊",
      };
    if (score >= 5)
      return {
        message: (
          <span>
            <strong>Effort level: Moderate.</strong> Feedback is helping us
            enhance our services and reduce effort.
          </span>
        ),
        emoji: "🙂",
      };
    if (score >= 3)
      return {
        message: (
          <span>
            <strong>Effort level: High.</strong> We're continuously working to
            improve our processes and make interactions easier.
          </span>
        ),
        emoji: "😐",
      };
    return { message: "Dissatisfied", emoji: "☹️" };
  };

  // ***********************  CSAT MESSAGE ************************
  const getSatisfactionMessage = (score) => {
    if (score >= 8)
      return {
        message: (
          <span>
            <strong>Satisfaction level: High.</strong> Service quality is
            meeting expectations.
          </span>
        ),
        emoji: "😊",
      };
    if (score >= 5)
      return {
        message: (
          <span>
            <strong>Satisfaction level: Moderate.</strong> There is room for
            improvement in service quality.
          </span>
        ),
        emoji: "🙂",
      };
    if (score >= 3)
      return {
        message: (
          <span>
            <strong>Satisfaction level: Low.</strong> Significant improvements
            are needed in service quality.
          </span>
        ),
        emoji: "😐",
      };
    return { message: "Very dissatisfied", emoji: "☹️" };
  };

  const [liveSurvey, setLiveSurvey] = useState("");
  const chartStyle = {
    width: 80,
  };
  const cardData = [
    {
      name: "NPS",
      fullName: "Net Promoter Score",
      score: NPS,
      promoter: promoterPercentage,
      detractor: detractorsPercentage,
      value: 100,
    },
    {
      name: "CES",
      fullName: "Customer Effort Score",
      score: question2Avg,
      value: 10,
      message: CESMessage(question2Avg),
    },
    {
      name: "CSAT",
      fullName: "Customer Satisfaction Score",
      score: CSAT,
      value: 10,
      message: getSatisfactionMessage(CSAT),
    },
  ];

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

          <div className="flex gap-3 mt-2 flex-col ">
            {cardData.map((data, index) => {
              return (
                <div className="flex justify-between gap-2">
                  <div key={index} className="w-[30%]">
                    <ResultCard data={data} index={index} scores={scores} />
                  </div>
                  <div className="w-[70%] bg-white rounded-sm ">
                    {<LineGraph />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Results;
