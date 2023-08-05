// import React from "react";
import React, { useEffect, useState } from "react";

import MyMap from "./myMap"; // Path to MyMap.js
import "./App.css";
import { Link } from "react-scroll";
import Lottie from "lottie-react";
import Find from "./elements/find.json";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import bigFoot from "./elements/FBF.png";
import Papa from "papaparse";
import operation from "./elements/operationS.png";
import scroll from "./elements/scrol.png";
import alg from "./elements/alg.png";
import scroll2 from "./elements/scroll2.png";

function App() {
  const [numberInput, setNumberInput] = useState(""); // State to track the input value

  const handleNumberChange = (event) => {
    // Update the state when the input changes
    setNumberInput(event.target.value);
  };

  const handleNumberSubmit = (event) => {
    event.preventDefault();
    // Use the numberInput variable as needed (e.g., console.log)
    console.log("User input:", numberInput);
  };
  return (
    <div className="App">
      <Parallax pages={2} style={{ top: "0", left: "0" }} className="animation">
        <ParallaxLayer offset={0} speed={6}>
          <div class="animation_layer parallax" id="background"></div>
          <img
            src={operation}
            alt="Operation Sas"
            className="positioned-image"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={3.5}>
          <div class="animation_layer parallax" id="cloud"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={4.5}>
          <div class="animation_layer parallax" id="stars"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={6}>
          <div class="animation_layer parallax" id="moon"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          <div class="offset2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.9999999} speed={6}>
          <img src={scroll} />
          <img src={scroll2} className="positioned-txt" />
        </ParallaxLayer>

        <ParallaxLayer offset={-0.111} speed={6}>
          <img src={scroll} />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={-0.5}>
          <img
            src={bigFoot}
            alt="Image Description"
            className="positioned-BF"
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={6}></ParallaxLayer>

        <ParallaxLayer offset={1} speed={6}>
          <img src={alg} className="positioned-alg" />

          {/* <div className="input-form">
            <form onSubmit={handleNumberSubmit}>
              <label htmlFor="numberInput">Enter a Number: </label>
              <input
                type="number" // Use type="number" for numeric input
                id="numberInput"
                value={numberInput}
                onChange={handleNumberChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div> */}

          <MyMap />
        </ParallaxLayer>

        {/* WORK ON THE MAP HERE, THE MAP IS HERE!! */}
      </Parallax>
    </div>
  );
}

export default App;
