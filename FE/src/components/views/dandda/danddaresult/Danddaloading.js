/**
 * 모델 인식 결과 페이지
 *
 * @author 다은
 * @version 1.0.0
 * 작성일 : 2022-02-12
 *
 **/

import React, { useEffect, useState, useRef } from "react";
import "./Danddaloading.css";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import "./Danddaloading.css";
import * as tmPose from "@teachablemachine/pose";
import ClipLoader from "react-spinners/ClipLoader";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFile } from "../../firebase/db";
import { Typography } from "@material-ui/core";
// Can be a string as well. Need to ensure each key-value pair ends with ;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Danddaloading() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [checkTurl, setCheckTurl] = useState(false);
  const [turl, setTurl] = useState(null);
  const [vid, setVid] = useState(null);
  const [results, setResults] = useState([]);
  const [labels, setLabels] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [shake, setShake] = useState("success");
  const videoRef = useRef();

  const navigate = useNavigate();

  let cnt = 0; // 맞춘 개수
  let startTimeSeconds; // 시작 시간 가져오기
  let curTimeSeconds; // 현재 시간 가져오기
  let t; // (현재 시간 - 시작 시간) => 경과한 시간(초) 구하기
  // 동작이 맞았는지 체크
  let m0c0 = false,
    m0c1 = false,
    m0c2 = false,
    m0c3 = false,
    m0c4 = false,
    m0c5 = false,
    m0c6 = false,
    m0c7 = false,
    m0c8 = false,
    m0c9 = false; // bounce
  let m1c0 = false,
    m1c1 = false,
    m1c2 = false,
    m1c3 = false,
    m1c4 = false,
    m1c5 = false,
    m1c6 = false,
    m1c7 = false,
    m1c8 = false,
    m1c9 = false,
    m1c10 = false; // peaches
  let m2c0 = false,
    m2c1 = false,
    m2c2 = false,
    m2c3 = false,
    m2c4 = false,
    m2c5 = false; // Next Level
  let m3c0 = false,
    m3c1 = false,
    m3c2 = false,
    m3c3 = false,
    m3c4 = false,
    m3c5 = false,
    m3c6 = false,
    m3c7 = false,
    m3c8 = false,
    m3c9 = false,
    m3c10 = false; // 스우파
  let m4c0 = false,
    m4c1 = false,
    m4c2 = false,
    m4c3 = false,
    m4c4 = false; // 롤린
  let URL;
  let labelContainer;

  // 모델 URL 값이 세팅 되었을 때, 모델 로딩 함수 실행
  const getTurl = () => {
    URL = turl;

    if (!checkTurl) loadModel();
    else return;
  };

  // 모델 로딩 함수
  const loadModel = async () => {
    // URL = "https://teachablemachine.withgoogle.com/models/8a2i874rC/"; // 넘어올 값

    setCheckTurl(true);

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    setIsModelLoading(true); // 모델 로딩중...
    try {
      const model = await tmPose.load(modelURL, metadataURL);

      const maxPredictions = model.getTotalClasses();

      setModel(model);
      setMaxPredictions(maxPredictions);
      // 스우파 pose10 제거하므로 1개 클래스 뺌
      if (turl === "https://teachablemachine.withgoogle.com/models/VDbRKik9o/")
        setMaxPredictions(maxPredictions - 1);
      setIsModelLoading(false);

      console.log("모델 로딩 성공");

      // console.log("loadModel 함수의 turl : " + URL);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // 파이어 베이스의 realtime video url 가져오기
  const downloadFirebaseVideo = () => {
    const database = getDatabase();

    // 영상 url 가져오기
    const message = ref(database, "message");
    onValue(message, async (snapshot) => {
      const data = snapshot.val();
      // console.log("videoUrl 전 : " + videoUrl);
      const videoUrl = await getFile(data);
      // console.log("videoUrl 후 : " + videoUrl);
      setVideoURL(videoUrl);
    });

    // 모델 url (turl) 가져오기
    const turlTmp = ref(database, "turl");
    onValue(turlTmp, async (snapshot) => {
      // console.log("turl 전 : " + data);
      const data = await snapshot.val();
      // console.log("turl 후 : " + data);
      setTurl(data);
    });

    // vid 값 가져오기
    const getVid = ref(database, "vid");
    onValue(getVid, async (snapshot) => {
      const data = await snapshot.val();
      setVid(data);
    });
  };

  // 인식하기
  const identify = async () => {
    const { pose, posenetOutput } = await model.estimatePose(videoRef.current, false);
    const results = await model.predict(posenetOutput);

    setResults(results);

    // 경과 시간 구하기
    curTimeSeconds = new Date().getSeconds();
    t = curTimeSeconds - startTimeSeconds - 1;

    // 바운스
    if (turl === "https://teachablemachine.withgoogle.com/models/NuAS299xH/") {
      for (let i = 0; i < maxPredictions; i++) {
        // 클래스 이름 : 정확도 innerHTML로 넣기
        // const prediction = results[i].className + ": " + results[i].probability.toFixed(2);
        // labelContainer.childNodes[i].innerHTML = prediction;

        // side_up
        if (results[0].probability.toFixed(2) > 0.9) {
          if (
            (t >= 10 && t <= 12) ||
            (t >= 17 && t <= 19) ||
            (t >= 22 && t <= 24) ||
            (t >= 27 && t <= 29) ||
            (t >= 32 && t <= 34) ||
            (t >= 42 && t <= 44)
          ) {
            if (!m0c0) {
              console.log(results[0].className + " 인식 => 경과 시간 : " + t + "초");
              m0c0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
              setCorrectCount(++cnt);
            }
          }
        }
        // side_down
        else if (results[1].probability.toFixed(2) > 0.9) {
          if (
            (t >= 13 && t <= 15) ||
            (t >= 20 && t <= 22) ||
            (t >= 24 && t <= 26) ||
            (t >= 29 && t <= 31) ||
            (t >= 43 && t <= 45)
          ) {
            if (!m0c1) {
              console.log(results[1].className + " 인식 => 경과 시간 : " + t + "초");
              m0c1 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // basic_up
        else if (results[2].probability.toFixed(2) > 0.9) {
          if ((t >= 37 && t <= 39) || (t >= 42 && t <= 44)) {
            if (!m0c2) {
              console.log(results[2].className + " 인식 => 경과 시간 : " + t + "초");
              m0c2 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // basic_down
        else if (results[3].probability.toFixed(2) > 0.9) {
          if (
            (t >= 35 && t <= 37) ||
            (t >= 44 && t <= 46) ||
            (t >= 56 && t <= 58) ||
            (t >= 59 && t <= 61)
          ) {
            if (!m0c3) {
              console.log(results[3].className + " 인식 => 경과 시간 : " + t + "초");
              m0c3 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // basic_up2
        else if (results[4].probability.toFixed(2) > 0.9) {
          if ((t >= 39 && t <= 41) || (t >= 46 && t <= 48)) {
            if (!m0c4) {
              console.log(results[4].className + " 인식 => 경과 시간 : " + t + "초");
              m0c4 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // basic_down2
        else if (results[5].probability.toFixed(2) > 0.9) {
          if ((t >= 38 && t <= 40) || (t >= 45 && t <= 47)) {
            if (!m0c5) {
              console.log(results[5].className + " 인식 => 경과 시간 : " + t + "초");
              m0c5 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // down3_left
        else if (results[6].probability.toFixed(2) > 0.9) {
          if ((t >= 50 && t <= 52) || (t >= 53 && t <= 55)) {
            if (!m0c6) {
              console.log(results[6].className + " 인식 => 경과 시간 : " + t + "초");
              m0c6 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // down3_right
        else if (results[7].probability.toFixed(2) > 0.9) {
          if ((t >= 48 && t <= 50) || (t >= 51 && t <= 53)) {
            if (!m0c7) {
              console.log(results[7].className + " 인식 => 경과 시간 : " + t + "초");
              m0c7 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // down4_left
        else if (results[8].probability.toFixed(2) > 0.9) {
          if ((t >= 62 && t <= 64) || (t >= 66 && t <= 68)) {
            if (!m0c8) {
              console.log(results[8].className + " 인식 => 경과 시간 : " + t + "초");
              m0c8 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // down4_left
        else if (results[9].probability.toFixed(2) > 0.9) {
          if ((t >= 61 && t <= 63) || (t >= 64 && t <= 66)) {
            if (!m0c9) {
              console.log(results[9].className + " 인식 => 경과 시간 : " + t + "초");
              m0c9 = true;
              setCorrectCount(++cnt);
            }
          }
        }
      }
    }

    // 피치스
    if (turl === "https://teachablemachine.withgoogle.com/models/h3cg54y28/") {
      for (let i = 0; i < maxPredictions; i++) {
        // pose1
        if (results[0].probability.toFixed(2) > 0.9) {
          if (t >= 7 && t <= 9) {
            if (!m1c0) {
              console.log(results[0].className + " 인식 => 경과 시간 : " + t + "초");
              m1c0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
              setCorrectCount(++cnt);
            }
          }
        }
        // pose2
        else if (results[1].probability.toFixed(2) > 0.9) {
          if (t >= 8 && t <= 10) {
            if (!m1c1) {
              console.log(results[1].className + " 인식 => 경과 시간 : " + t + "초");
              m1c1 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose3
        else if (results[2].probability.toFixed(2) > 0.9) {
          if (t >= 10 && t <= 12) {
            if (!m1c2) {
              console.log(results[2].className + " 인식 => 경과 시간 : " + t + "초");
              m1c2 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose4
        else if (results[3].probability.toFixed(2) > 0.9) {
          if (t >= 13 && t <= 15) {
            if (!m1c3) {
              console.log(results[3].className + " 인식 => 경과 시간 : " + t + "초");
              m1c3 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose5
        else if (results[4].probability.toFixed(2) > 0.9) {
          if (t >= 15 && t <= 17) {
            if (!m1c4) {
              console.log(results[4].className + " 인식 => 경과 시간 : " + t + "초");
              m1c4 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose6
        else if (results[5].probability.toFixed(2) > 0.9) {
          if (t >= 18 && t <= 20) {
            if (!m1c5) {
              console.log(results[5].className + " 인식 => 경과 시간 : " + t + "초");
              m1c5 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose7
        else if (results[6].probability.toFixed(2) > 0.9) {
          if (t >= 21 && t <= 23) {
            if (!m1c6) {
              console.log(results[6].className + " 인식 => 경과 시간 : " + t + "초");
              m1c6 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose8
        else if (results[7].probability.toFixed(2) > 0.9) {
          if (t >= 24 && t <= 26) {
            if (!m1c7) {
              console.log(results[7].className + " 인식 => 경과 시간 : " + t + "초");
              m1c7 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose9
        else if (results[8].probability.toFixed(2) > 0.9) {
          if (t >= 24 && t <= 27) {
            if (!m1c8) {
              console.log(results[8].className + " 인식 => 경과 시간 : " + t + "초");
              m1c8 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose10
        else if (results[9].probability.toFixed(2) > 0.9) {
          if (t >= 26 && t <= 28) {
            if (!m1c9) {
              console.log(results[9].className + " 인식 => 경과 시간 : " + t + "초");
              m1c9 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose11
        else if (results[10].probability.toFixed(2) > 0.9) {
          if (t >= 28 && t <= 30) {
            if (!m1c10) {
              console.log(results[10].className + " 인식 => 경과 시간 : " + t + "초");
              m1c10 = true;
              setCorrectCount(++cnt);
            }
          }
        }
      }
    }

    // Next Level
    if (turl === "https://teachablemachine.withgoogle.com/models/BVupLxFSj/") {
      for (let i = 0; i < maxPredictions; i++) {
        // 디귿1
        if (results[0].probability.toFixed(2) > 0.9) {
          if (t >= 44 && t <= 47) {
            if (!m2c0) {
              console.log(results[0].className + " 인식 => 경과 시간 : " + t + "초");
              m2c0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
              setCorrectCount(++cnt);
            }
          }
        }
        // 디귿2
        else if (results[1].probability.toFixed(2) > 0.9) {
          if (t >= 49 && t <= 52) {
            if (!m2c1) {
              console.log(results[1].className + " 인식 => 경과 시간 : " + t + "초");
              m2c1 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // 우우포즈
        else if (results[2].probability.toFixed(2) > 0.9) {
          if ((t >= 28 && t <= 30) || (t >= 36 && t <= 38)) {
            if (!m2c2) {
              console.log(results[2].className + " 인식 => 경과 시간 : " + t + "초");
              m2c2 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // 감당포즈
        else if (results[3].probability.toFixed(2) > 0.9) {
          if (t >= 20 && t <= 22) {
            if (!m2c3) {
              console.log(results[3].className + " 인식 => 경과 시간 : " + t + "초");
              m2c3 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // 새침포즈
        else if (results[4].probability.toFixed(2) > 0.9) {
          if (t >= 62 && t <= 64) {
            if (!m2c4) {
              console.log(results[4].className + " 인식 => 경과 시간 : " + t + "초");
              m2c4 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // 랄랄포즈
        else if (results[5].probability.toFixed(2) > 0.9) {
          if (t >= 69 && t <= 71) {
            if (!m2c5) {
              console.log(results[5].className + " 인식 => 경과 시간 : " + t + "초");
              m2c5 = true;
              setCorrectCount(++cnt);
            }
          }
        }
      }
    }

    // 스우파
    if (turl === "https://teachablemachine.withgoogle.com/models/VDbRKik9o/") {
      for (let i = 0; i < maxPredictions; i++) {
        // pose1
        if (results[0].probability.toFixed(2) > 0.9) {
          if (t >= 2 && t <= 4) {
            if (!m3c0) {
              console.log(results[0].className + " 인식 => 경과 시간 : " + t + "초");
              m3c0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
              setCorrectCount(++cnt);
            }
          }
        }
        // pose2
        else if (results[1].probability.toFixed(2) > 0.9) {
          if (t >= 11 && t <= 13) {
            if (!m3c1) {
              console.log(results[1].className + " 인식 => 경과 시간 : " + t + "초");
              m3c1 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose3
        else if (results[2].probability.toFixed(2) > 0.9) {
          if (t >= 15 && t <= 17) {
            if (!m3c2) {
              console.log(results[2].className + " 인식 => 경과 시간 : " + t + "초");
              m3c2 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose4
        else if (results[3].probability.toFixed(2) > 0.9) {
          if (t >= 20 && t <= 22) {
            if (!m3c3) {
              console.log(results[3].className + " 인식 => 경과 시간 : " + t + "초");
              m3c3 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose5
        else if (results[4].probability.toFixed(2) > 0.9) {
          if (t >= 29 && t <= 31) {
            if (!m3c4) {
              console.log(results[4].className + " 인식 => 경과 시간 : " + t + "초");
              m3c4 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose6
        else if (results[5].probability.toFixed(2) > 0.9) {
          if (t >= 33 && t <= 35) {
            if (!m3c5) {
              console.log(results[5].className + " 인식 => 경과 시간 : " + t + "초");
              m3c5 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose7
        else if (results[6].probability.toFixed(2) > 0.9) {
          if (t >= 39 && t <= 41) {
            if (!m3c6) {
              console.log(results[6].className + " 인식 => 경과 시간 : " + t + "초");
              m3c6 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose8
        else if (results[7].probability.toFixed(2) > 0.9) {
          if (t >= 41 && t <= 43) {
            if (!m3c7) {
              console.log(results[7].className + " 인식 => 경과 시간 : " + t + "초");
              m3c7 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose9
        else if (results[8].probability.toFixed(2) > 0.9) {
          if (t >= 53 && t <= 55) {
            if (!m3c8) {
              console.log(results[8].className + " 인식 => 경과 시간 : " + t + "초");
              m3c8 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose10 은 혼동되므로 제거
        // else if (results[9].probability.toFixed(2) > 0.9) {
        //   if (t >= 57 && t <= 59) {
        //     if (!m3c9) {
        //       console.log(results[9].className + " 인식 => 경과 시간 : " + t + "초");
        //       m3c9 = true;
        //       setCorrectCount(++cnt);
        //       // 맞았습니다 !! 표시
        //       correct();
        //     }
        //   }
        // }
        // pose11
        else if (results[10].probability.toFixed(2) > 0.9) {
          if (t >= 60 && t <= 62) {
            if (!m3c10) {
              console.log(results[10].className + " 인식 => 경과 시간 : " + t + "초");
              m3c10 = true;
              setCorrectCount(++cnt);
            }
          }
        }
      }
    }

    // 롤린
    if (turl === "https://teachablemachine.withgoogle.com/models/65q3m21WL/") {
      for (let i = 0; i < maxPredictions; i++) {
        // pose1
        if (results[0].probability.toFixed(2) > 0.9) {
          if (t >= 4 && t <= 8) {
            if (!m4c0) {
              console.log(results[0].className + " 인식 => 경과 시간 : " + t + "초");
              m4c0 = true; // 반복문 안에서 setState 쓰면 리렌더링이 안되므로 쓰면 X
              setCorrectCount(++cnt);
            }
          }
        }
        // pose2
        else if (results[1].probability.toFixed(2) > 0.9) {
          if (t >= 6 && t <= 9) {
            if (!m4c1) {
              console.log(results[1].className + " 인식 => 경과 시간 : " + t + "초");
              m4c1 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose3
        else if (results[2].probability.toFixed(2) > 0.9) {
          if (t >= 8 && t <= 10) {
            if (!m4c2) {
              console.log(results[2].className + " 인식 => 경과 시간 : " + t + "초");
              m4c2 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose4
        else if (results[3].probability.toFixed(2) > 0.9) {
          if (t >= 12 && t <= 18) {
            if (!m4c3) {
              console.log(results[3].className + " 인식 => 경과 시간 : " + t + "초");
              m4c3 = true;
              setCorrectCount(++cnt);
            }
          }
        }
        // pose5
        else if (results[4].probability.toFixed(2) > 0.9) {
          if (t >= 21 && t <= 29) {
            if (!m4c4) {
              console.log(results[4].className + " 인식 => 경과 시간 : " + t + "초");
              m4c4 = true;
              setCorrectCount(++cnt);
            }
          }
        }
      }
    }
  };

  // 동영상 인식 반복 호출
  const loop = async () => {
    await identify();
    setAnimationFrame(window.requestAnimationFrame(loop));
  };

  // loop 함수 호출하기 (이 함수는 한번만 실행, startTime을 구하기 위해 사용)
  const startLoop = () => {
    startTimeSeconds = new Date().getSeconds();

    labelContainer = document.querySelector(".label-container");

    loop();
  };

  // 파이어베이스 업로드
  useEffect(() => {
    downloadFirebaseVideo();
  }, []);

  useEffect(() => {
    setShake("shake success");
    setTimeout(() => {
      setShake("success");
    }, 1000);
  }, [correctCount]);

  // 모델 로딩중일 때
  if (isModelLoading) {
    return (
      <div className="container">
        <div className="load-3">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    );
  }

  // 비디오가 끝나면 인식 멈춤
  const myCallback = () => {
    navigate("/:id", {
      state: {
        maxPredictions: maxPredictions,
        correctCount: correctCount,
        original_vid: vid,
      },
    });
    // return window.cancelAnimationFrame(animationFrame);
  };

  // 비디오 재생
  const play = () => {
    videoRef.current.play();
  };

  return (
    <div className="body">
      <div className="videoHolder">
        {videoURL && (
          <video
            id="video"
            className="file-upload-video"
            src={videoURL}
            width="300"
            height="300"
            style={
              ({ transform: "rotateY(180deg)" },
              { "-webkit-transform": "rotateY(180deg)" /* Safari and Chrome */ },
              { "-moz-transform": "rotateY(180deg)" })
            }
            crossOrigin="anonymous" // 이거 없으면 model.estimatePose 실행 안됨★
            ref={videoRef}
            // autoplay="autoplay"
            // muted="muted"
            // controls
            onPlay={startLoop}
            onEnded={() => myCallback()} // 비디오 끝나면 인식 멈춤
          ></video>
        )}
      </div>

      {/* <div className="checkvideoURL">videoURL 없을 때 :{videoURL}</div> */}
      {/* {videoURL && <div className="checkvideoURL">videoURL 있을 때 :{videoURL}</div>} */}
      {/* 몇 개 맞췄는지 결과 내기 */}
      {turl && (
        <div className="getTurl">
          <button className="play-button" onClick={play}>
            Play
          </button>
          <p className={shake} style={{ opacity: 0 }}>
            맞았습니다! 🔥
          </p>
          <p>맞춘 동작 개수</p>
          <p>
            {correctCount} / {maxPredictions}
          </p>
          {getTurl()}
        </div>
      )}
    </div>
  );
}
export default Danddaloading;
