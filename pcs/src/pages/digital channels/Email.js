import React from "react";
import image from "../../assets/under_construction.jpg";
import { motion } from "framer-motion";
const Email = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full relative h-[calc(100vh-60px)] flex justify-center items-center "
    >
      <img src={image} width="600px" alt="under construction"></img>
      <img
        src="https://imgs.search.brave.com/EWLK01EhQSKovm9wZyK-OxOtIFhJq864gQGcEZ7ZINM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2lmcy1wYXJhZGlz/ZS5jb20vYW5pbWF0/aW9ucy9hbmltYXRl/ZC1naWZzLXVuZGVy/LWNvbnN0cnVjdGlv/bi0yNDIuZ2lmLnBh/Z2VzcGVlZC5jZS42/aTlWWHJXN1pVLmdp/Zg.gif"
        className="absolute top-24 left-20 "
        alt="under construction gif"
      ></img>
    </motion.div>
  );
};

export default Email;
