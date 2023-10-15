"use client";

import Image from "next/image";
import { useState } from "react";
import kr from "./kr.jpg";

export default function UI() {
  const [blur, setBlur] = useState(4);
  const [opacity, setOpacity] = useState(20);

  return (
    <div
      className="relative"
      style={{
        aspectRatio: "700/1050",
      }}
    >
      <Image className="absolute" src={kr} alt="kr" />
      <div className="absolute p-3 text-sm">
        Photo by{" "}
        <a href="https://unsplash.com/@hjlee200?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Huijae Lee
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/photos/a-city-street-with-cars-parked-on-the-side-of-the-road-MuDfQisNLoA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </div>
      <div className="absolute right-0">
        <div className="px-8 py-5">
          <label
            htmlFor="default-range"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            흐림도 (blur)
          </label>
          <div>
            <span className="text-sm text-gray-900 dark:text-white">
              {blur.toFixed(1)}
            </span>
          </div>
          <input
            id="default-range"
            type="range"
            min={0.0}
            max={20.0}
            value={blur}
            step={0.1}
            onChange={(e) => setBlur(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
        </div>

        <div className="px-8 py-5">
          <label
            htmlFor="default-range"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            투명도 (opacity)
          </label>
          <div>
            <span className="text-sm text-gray-900 dark:text-white">
              {opacity.toFixed(1)}
            </span>
          </div>
          <input
            id="default-range"
            type="range"
            min={0.0}
            max={100.0}
            value={opacity}
            step={0.1}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
        </div>
      </div>
      <svg width="660" height="220" className="absolute bottom-0">
        <defs>
          <mask id="text-mask-1" x="0" y="0" width="100" height="100">
            <svg>
              <text
                x="30"
                y="140"
                fontFamily="Helvetica"
                fontWeight="bold"
                fontSize="7em"
                fill="#999"
              >
                방법 찾고 있어요
              </text>
            </svg>
          </mask>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>
        <rect
          x="0"
          y="0"
          width="660"
          height="220"
          fill="#fff"
          mask="url(#text-mask-1)"
          filter="url(#blur)"
          opacity={opacity}
        >
          sdfsdf
        </rect>
      </svg>
      {/* <svg
        className="absolute bottom-0"
        style={{
          // background: "rgba( 255, 255, 255, 0.25 )",
          // textShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ),
          // borderRadius: 10px,
          backdropFilter: `blur( ${blur}px )`,
          // border: 1px solid rgba( 255, 255, 255, 0.18 ),
        }}
      >
        <text
          x={40}
          y={40}
          fill={`rgba( 255, 255, 255, ${opacity / 100} )`}
          className="text-4xl font-bold shadow-lg"
          style={
            {
              // backdropFilter: `blur( ${blur}px )`,
            }
          }
        >
          I love SVG!
        </text>
      </svg> */}
      {/* <div
        className="absolute bottom-0 text-transparent bg-white bg-clip-text"
        style={{
          // background: "rgba( 255, 255, 255, 0.25 )",
          // textShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          // box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ),
          backdropFilter: "blur( 4px )",
          // borderRadius: 10px,
          // border: 1px solid rgba( 255, 255, 255, 0.18 ),
        }}
      >
        <p className="m-0 mb-5 text-4xl font-bold">오늘의 날씨는</p>
        <p className="m-0 font-extrabold text-8xl">흐립니다.</p>
      </div> */}
      <div className="absolute bottom-0">
        <svg width="550" height="300">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
            <mask id="text-mask">
              <svg>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="4rem"
                  fontWeight="bold"
                  fill="black"
                  fontFamily="Helvetica"
                  // fontWeight="bold"
                  // fontSize="7em"
                  // fill="#999"
                >
                  Hello, World! !@##@#@
                </text>
              </svg>
            </mask>
          </defs>
          <pattern
            id="bg"
            patternUnits="userSpaceOnUse"
            width={300}
            height={300}
          >
            <image href={kr.src} width={300} height={300} />
          </pattern>

          <rect
            width="100%"
            height="100%"
            // fill="url(#bg)"
            fill="white"
            mask="url(#text-mask)"
            filter="url(#blur)"
          ></rect>
        </svg>
      </div>
    </div>
  );
}
