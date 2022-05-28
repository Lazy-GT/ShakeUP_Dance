import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate, useHistory } from "react-router-dom";
// import wetboy from './img/wetboy.jpg'

function WorldcupMain(props) {
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
      <h3>2월 3주차 월드컵: 코믹댄스 최강자, 나야나</h3>
      <br />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1645042733893?alt=media&amp;token=dab680ef-9185-4ee0-9374-a380b5738444"
        style={{ width: "90px", height: "90px" }}
      />
      <br />
      <h4>참여영상 등록 가능 기간: </h4>
      <h4>2022.02.13 ~ 2022.02.19 </h4>

      <br />

      <Link to="./vote" style={{ textDecoration: "none" }}>
        <Button
          style={{ backgroundColor: "#6200EE", width: "50vw" }}
          color="primary"
          variant="contained"
        >
          투표하러 가기
        </Button>
      </Link>
      <br />
      <Link to="./participation" style={{ textDecoration: "none" }}>
        <Button
          style={{ backgroundColor: "#6200EE", width: "50vw" }}
          color="primary"
          variant="contained"
        >
          월드컵 참여하기
        </Button>
      </Link>
      <br />
      <Link to="./vote/result" style={{ textDecoration: "none" }}>
        <Button
          style={{ backgroundColor: "#6200EE", width: "50vw" }}
          color="primary"
          variant="contained"
        >
          랭킹 보기
        </Button>
      </Link>
    </div>
  );
}

export default WorldcupMain;
