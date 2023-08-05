// import React from "react";
import React, { useEffect, useState } from "react";

import MyMap from "./myMap"; // Path to MyMap.js
import "./App.css";
import { Link } from "react-scroll";
import Lottie from "lottie-react";
import Find from "./elements/find.json";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import bigFoot from "./elements/bigFF.png";
import Papa from "papaparse";

function App() {
  return (
    <div className="App">
      <Parallax pages={2} style={{ top: "0", left: "0" }} className="animation">
        <ParallaxLayer offset={0} speed={6}>
          <div class="animation_layer parallax" id="background"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={3.5}>
          <div class="animation_layer parallax" id="cloud"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={4.5}>
          <div class="animation_layer parallax" id="stars"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={10.5}>
          <img src={bigFoot} alt="Image Description" />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={6}>
          <div class="animation_layer parallax" id="moon"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          <div class="offset2"></div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.999999999} speed={6}>
          <MyMap />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={6}>
          <h1>placeholder for other necessary data</h1>
        </ParallaxLayer>
        {/* WORK ON THE MAP HERE, THE MAP IS HERE!! */}
      </Parallax>

      {/* 
      <h1>Operation Sasquatch (aka Big Foot)</h1>
      <Lottie loop={true} animationData={Find} />
      <nav>
        <ul className="headerNav">
          <li>
            <Link to="section1" smooth={true} duration={500}>
              Header 1
            </Link>
          </li>
          <li>
            <Link to="section2" smooth={true} duration={500}>
              Header 2
            </Link>
          </li>
        </ul>
      </nav>

      <div id="section1" className="sectionStyle">
        <h2>The legend</h2>
        <p>
          The legend of Bigfoot, also known as Sasquatch, revolves around an
          elusive, large, hairy humanoid creature believed to inhabit remote
          forests in North America. Despite numerous sightings and
          investigations, no definitive evidence of its existence has been
          found. Nevertheless, the myth persists, captivating the imagination of
          people worldwide and inspiring countless books, films, and
          documentaries. The allure of Bigfoot continues to endure as a
          cherished part of folklore and popular culture.
        </p>
      </div>

      <div id="section2" className="sectionStyle">
        <h2>Find Big Foot near you with DSA :p </h2>
        <p>
          To find Bigfoot sightings on a website, open the site and explore its
          homepage, which may feature recent sightings or maps with markers
          showing encounter locations. Use the search function to look for
          specific information by entering relevant keywords or utilize filters
          to sort sightings by location, date, or credibility. Check an
          interactive map if available, zoom in on specific areas, and click on
          markers to access detailed reports. Verify information by
          cross-referencing with reputable sources. Optionally, you can
          contribute your own sighting or engage with the community through
          forums. Keep in mind that Bigfoot sightings lack scientific evidence,
          so maintain a critical perspective while exploring the website.
        </p>
      </div>
      <MyMap />
      <div className="mapStyle"></div> */}
    </div>
  );
}

export default App;
