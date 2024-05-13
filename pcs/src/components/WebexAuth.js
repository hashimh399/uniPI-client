import consiliumLogo from "../assets/consiliumSymbol.png";

import "../styles/webex.css";

import webex from "../assets/webex.svg";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { TextField } from "@mui/material";
function WebexAuth({ handleLogin }) {
  return (
    <div className="flex h-screen justify-center items-center  bg-shade2">
      <div className="w-10/12 h-[80%] glass flex items-center  justify-between">
        {/* left side */}

        <div className="w-1/2  mix-blend-multiply h-full bgimage relative ">
          {" "}
          <div className="w-full h-full bggradient absolute right-0 left-[100%]"></div>
        </div>
        {/* right side */}
        <div className="flex justify-center items-center w-1/2    ">
          <div className=" flex w-full flex-col justify-center z-40   rounded-md  p-8 max-w-md  space-y-6">
            <img
              className="mx-auto h-16"
              alt="consilium_logo"
              src={consiliumLogo}
            />
            <h1 className="text-xl font-bold text-center text-slate-300">
              CONSILIUM UniPI
            </h1>
            <TextField
              id="standard-password-input"
              label="Email"
              type="email"
              autoComplete="current-password"
              variant="standard"
              sx={{
                "& label": {
                  color: "#bde5fc",
                },

                "& input": {
                  color: "#bde5fc",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#bde5fc",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#bde5fc",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
              }}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              sx={{
                "& label": {
                  color: "#bde5fc",
                },

                "& input": {
                  color: "#bde5fc",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#bde5fc",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#bde5fc",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
              }}
            />

            <div className="flex justify-between w-full items-center">
              <button className="bg-shade2 hover:bg-green-900 duration-300 rounded-full px-4 py-1  text-white font-semibold">
                Signin
              </button>
              <div className="flex items-center text-[#bde5fc] gap-2">
                <input type="checkbox" id="forgot"></input>
                <label for="forgot  ">Forgot password?</label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-full h-[.1rem] bg-shade1"></div>
              <p className="font-semibold">or</p>
              <div className="w-full h-[.1rem] bg-shade1"></div>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-shade2 w-10 h-10 flex items-center justify-center  text-white "
              >
                <FaGoogle className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-shade2 w-10 h-10 flex items-center justify-center  text-white "
              >
                <FaFacebookF className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleLogin}
                className="rounded-full bg-shade2 w-10 h-10 flex items-center justify-center  text-white "
              >
                <img
                  alt="login_icon"
                  src={webex}
                  style={{ width: "24px", height: "24px", filter: "invert(1)" }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebexAuth;

//***************************************************************************** */
