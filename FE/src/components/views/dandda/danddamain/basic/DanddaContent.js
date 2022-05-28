import React, { useState, useEffect } from "react";
import CarouselSlide from "../CarouselSlide";
import { useNavigate } from "react-router-dom";
import { FaAndroid, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slide from "@material-ui/core/Slide";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import profile_src from "./img/profile.png";
import axios from "axios";

function Arrow(props) {
  const { direction, clickFunction } = props;
  const icon =
    direction === "left" ? (
      <FaChevronLeft style={{ color: "6200EE" }} />
    ) : (
      <FaChevronRight style={{ color: "6200EE" }} />
    );

  return <div onClick={clickFunction}>{icon}</div>;
}

function DanddaContent() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) {
        onArrowClick("right");
      }
      if (e.keyCode === 37) {
        onArrowClick("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const SLIDE_INFO = [
    {
      backgroundImage: `url(${img1})`,
      title: "바운스",
      profile_name: "seoyoung",
      profile_src: profile_src,
      id: 4,
      uid: 2,
      url: "https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F%EA%B8%B0%EB%B3%B8%EA%B8%B0_%EB%B0%94%EC%9A%B4%EC%8A%A4.mp4?alt=media&token=c16ebecc-4d7e-47e5-91c0-2fe8563f7f56",
      turl: "https://teachablemachine.withgoogle.com/models/NuAS299xH/",
    },
    {
      backgroundImage: `url(${img2})`,
      title: "피치스",
      profile_name: "seoyoung",
      profile_src: profile_src,
      id: 2,
      uid: 2,
      url: "https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2Fpeaches.mp4?alt=media&token=b679d220-5ea0-4fa6-9f5c-2f5f1471b201",
      turl: "https://teachablemachine.withgoogle.com/models/h3cg54y28/",
    },
    {
      backgroundImage: `url(${img3})`,
      title: "롤린",
      profile_name: "seoyoung",
      profile_src: profile_src,
      id: 29,
      uid: 2,
      url: "https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F%EB%A1%A4%EB%A6%B0.mp4?alt=media&token=817141ee-a657-4617-9bf6-2982026a94de",
      turl: "https://teachablemachine.withgoogle.com/models/65q3m21WL/",
    },
  ];

  const [index, setIndex] = useState(0);
  const content = SLIDE_INFO[index];
  const numSlides = SLIDE_INFO.length;

  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");

  const navigate = useNavigate();

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;

    const oppDirection = direction === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };

  return (
    <div className="DanddaMain">
      {/* 해당 캐로셀을 클릭 시 카메라 이동 함수 실행 */}
      <div
        className="Carousel"
        // onClick={movecamera}
      >
        <Arrow direction="left" clickFunction={() => onArrowClick("left")} />
        <Slide in={slideIn} direction={slideDirection}>
          <div>
            <CarouselSlide content={content} />
          </div>
        </Slide>
        <Arrow direction="right" clickFunction={() => onArrowClick("right")} />
      </div>
    </div>
  );
}

export default DanddaContent;
