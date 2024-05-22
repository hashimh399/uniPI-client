import React from "react";
import ImgMediaCard from "../components/ResultCard";

function Results() {
  return (
    <>
      <div className="w-full px-7 py-2 bg-slate-200">
        {/* header */}
        <div className="w-full bg-shade1 rounded-full flex justify-between items-center mt-5 ">
          {" "}
          <div className="flex  gap-2 items-center">
            <img
              src="http://localhost:3000/static/media/consiliumSymbol.05461c94a5102cf53589.png"
              alt="img"
              width="40px"
              height="40px"
            ></img>
            <p className="font-semibold text-white">Lorem</p>
            <p className="font-semibold text-white">Lorem</p>
          </div>
          {/* badge */}
          <div className=" flex gap-2">
            <img
              src="http://localhost:3000/static/media/consiliumSymbol.05461c94a5102cf53589.png"
              alt="img"
              width="40px"
              height="40px"
            ></img>
            <img
              src="http://localhost:3000/static/media/consiliumSymbol.05461c94a5102cf53589.png"
              alt="img"
              width="40px"
              height="40px"
            ></img>
            <img
              src="http://localhost:3000/static/media/consiliumSymbol.05461c94a5102cf53589.png"
              alt="img"
              width="40px"
              height="40px"
            ></img>
          </div>
        </div>
        <div className="mt-5">
          {" "}
          <ImgMediaCard />{" "}
        </div>
      </div>
    </>
  );
}

export default Results;
