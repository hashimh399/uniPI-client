import { NavLink } from "react-router-dom";

import { MdMessage } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";

import { BsChatText } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdDashboardCustomize } from "react-icons/md";
import { MdRecordVoiceOver } from "react-icons/md";
import { MdOutlineSettingsVoice } from "react-icons/md";
import SidebarMenu from "./SidebarMenu";
import { CiEdit } from "react-icons/ci";
import { PiQueueFill } from "react-icons/pi";

import { MdQueueMusic } from "react-icons/md";
import "../../styles/sidebar.css";
import "../../styles/active.css";
import Avatar from "@mui/material/Avatar";
import { BsFillFileRichtextFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboardCustomize />,
  },

  {
    path: "/results",
    name: "Result",
    icon: <MdMessage />,
  },
  {
    path: "/DigitalChannel",
    name: "Digital Channel",
    icon: <BiAnalyse />,
    subRoutes: [
      {
        path: "/digitalchannel/dashboard",
        name: "Dashboard",
        icon: <MdDashboardCustomize />,
      },
    ],
  },
  {
    path: "/queueStatistics",
    name: "Queue Statistics",
    icon: <PiQueueFill />,
    subRoutes: [
      {
        path: "/queueStatistics/voice",
        name: "Voice",
        icon: <MdOutlineSettingsVoice />,
      },
      {
        path: "/queueStatistics/chat",
        name: "Chat",
        icon: <BsChatText />,
      },
    ],
  },
  {
    path: "/voice-survey",
    name: "Voice Survey",
    icon: <MdRecordVoiceOver />,
    subRoutes: [
      {
        path: "/voice-survey/edit",
        name: "Edit Survey ",
        icon: <CiEdit />,
      },
      {
        path: "/voice-survey/templet",
        name: "Templates ",
        icon: <BsFillFileRichtextFill />,
      },
      {
        path: "/voice-survey/audio",
        name: "Audio Files ",
        icon: <MdQueueMusic />,
      },
    ],
  },
];

const SideBar = ({
  children,
  checkOpen,
  agentData,
  getAllDetails,
  signOut,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  console.log("AGENT DATA IS ", agentData);
  useEffect(() => {
    checkOpen(isOpen);
    console.log(isOpen);
  }, [isOpen]);

  // *****************************************************

  // avatar on click menu option

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ****************************************************

  //******************************************** */
  // avatar

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.includes(" ")
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : name[0].toUpperCase(),
    };
  }

  //************************************************ */

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <div className="main-container relative  z-40 ">
        <motion.div
          animate={{
            width: isOpen ? "240px" : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
            },
          }}
          className={`sidebar  `}
        >
          <div className="top_section border-b-2 border-shade1  bg-shade1 ">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo items-center gap-3 "
                >
                  {/* <img alt="logo " src={logo} width="35px"></img> */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">
                      Uni<span className="text-3xl">&#120645;</span>
                    </span>
                  </div>
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars cursor-pointer ">
              {isOpen ? (
                <GiHamburgerMenu onClick={toggle} />
              ) : (
                <h1 className="text-3xl pl-2" onClick={toggle}>
                  &#120645;
                </h1>
              )}{" "}
            </div>
          </div>

          <section className="routes ">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link flex items-center"
                >
                  <div className="icon text-2xl">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{
              durationd: 0.5,
              type: "spring",
              stiffness: 200,
              origin: 0,
            }}
            className="absolute bottom-16 px-3 border-t-2  border-shade1 w-full "
          >
            <p className="text-sm -ml-[.4rem] flex gap-2 pt-2 items-center  cursor-pointer ">
              {agentData && agentData.displayName && (
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    {" "}
                    <Avatar
                      {...stringAvatar(agentData?.displayName)}
                      sx={{ width: 35, height: 35 }}
                    />
                  </IconButton>
                </Tooltip>
              )}

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: "45%",
                      left: -5, // Adjust this value to position the pointer
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    signOut();
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>

              {isOpen && (
                <motion.p
                  transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  end={{ opacity: 0, x: -50 }}
                >
                  {" "}
                  {agentData?.displayName}
                </motion.p>
              )}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SideBar;
