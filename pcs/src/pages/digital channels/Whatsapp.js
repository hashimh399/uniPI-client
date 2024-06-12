import React from "react";
import image from "../../assets/under_construction.jpg";
import { motion } from "framer-motion";
const Whatsapp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[calc(100vh-60px)] flex justify-center items-center "
    >
      <img src={image} width="600px" alt="under construction"></img>
    </motion.div>
  );
};

export default Whatsapp;
