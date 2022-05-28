/**
 * 점수 확인 페이지
 *
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-02-02
 *
 **/

import React from "react";
import "./DanddaResult.css";
import Avatar from "@material-ui/core/Avatar";
import { Route, Link, useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Progressbar from "./ProgressBar";
import kakao from "./images/kakao.jpg";
import insta from "./images/instagram.jpg";
import face from "./images/facebook.png";
import Button from "@material-ui/core/Button";
import { getFile, deleteFile } from "../../firebase/db";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function DanddaResult(props) {
  // vid 전 페이지에서 제공받음.
  const location = useLocation();
  const classes = useStyles();
  const { original_vid, maxPredictions, correctCount } = location.state;
  const navigate = useNavigate();
  const score = (correctCount / maxPredictions).toFixed(2) * 100


  const pushId = () => {
    navigate(`./upload`, { state: { original_vid: original_vid, score: score } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "88vh",
      }}
    >
      <Progressbar bgcolor="#6200EE" height={30} progress = {score} />
      <h2>총 {maxPredictions}개 동작</h2>
      <h2>맞춘 동작: {correctCount}개 동작</h2>
      <br />
      <div className={classes.root} style={{ textAlign: "center" }}>
        <p>이 영상을 내 채널에 업로드 하시겠습니까?</p>
        {/* <Link to={{pathname:'./upload', state:{vid:vid}}}> */}
        <Button color="primary" variant="contained" onClick={pushId}>
          네
        </Button>
        {/* <Button color="secondary" variant="contained" onClick={deleteFile(0)}>아니오</Button> */}
      </div>
    </div>
  );
}

export default DanddaResult;
