import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Route, Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { FaAndroid, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import zIndex from "@material-ui/core/styles/zIndex";

export default function CarouselSlide(props) {
  const { backgroundImage, title, profile_src, profile_name, id, uid, url, turl } = props.content;

  const useStyles = makeStyles(() => ({
    card: {
      backgroundImage,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: 5,
      margin: "0px 15px",
      padding: "10px 10px",
      width: "75vw",
      height: "25vh",
      boxShadow: "10px 10px 10px grey",
      display: "flex",
      flexDirection: "column",
    },

    title: {
      justifyContent: "center",
      borderRadius: 5,
      color: "white",
      width: "75vw",
      backgroundColor: "#6200EE",
      alignSelf: "center",
      textAlign: "center",
      lineHeight: "40px",
    },

    circle: {
      width: "15px",
      height: "15px",
      borderRadius: "50%",
    },
  }));

  const classes = useStyles();
  const navigate = useNavigate();

  const movecamera = () => {
    window.Android.showToast(url, turl, id);
    return "arr";
  };

  const onClick = () => {
    if (localStorage.getItem('UserId')) {
      movecamera();
    } else {
      alert('로그인 먼저 해주세요')
      navigate('/login')
    }
  };

  // // realtime DB 에 turl 넣기
  // const uploadModelUrl = () => {};

  const goTomypage = (event) => {
    event.stopPropagation();
    navigate(`/mypage/${uid}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3 className={classes.title} onClick={onClick}>{title}</h3>
      <Card className={classes.card}>
        <div className={classes.circle} onClick={goTomypage}>
          <Avatar alt={profile_name} src={profile_src} />
        </div>
      </Card>
    </div>
  );
}
