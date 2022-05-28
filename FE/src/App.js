import React, { useEffect, createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";

import DanddaMain from "./components/views/dandda/danddamain/DanddaMain";
import LoginPage from "./components/views/login/Login";
import SignUp from "./components/views/Signup/Signup";
import SignUpNext from "./components/views/Signup/SignupNext";
import Sidebar from "./components/views/bar/Sidebar";
import JoinEnd from "./components/views/Signup/JoinEnd";
import Find from "./components/views/find/Find";
import FindId from "./components/views/find/FindId";
import FindIdComplete from "./components/views/find/FindIdComplete";
import FindPassword from "./components/views/find/FindPassword";
import FindPasswordComplete from "./components/views/find/FindPasswordComplete";
import PutCredentials from "./components/views/login/PutCredentials";
import Auth from "./hoc/auth";
import ArticleDetail from "./components/views/community/ArticleDetail";
import DanddaResult from "./components/views/dandda/danddaresult/DanddaResult";
import DanddaUpload from "./components/views/dandda/danddaupload/DanddaUpload";
import DanddaUploadComplete from "./components/views/dandda/danddaupload/DanddaUploadComplete";
import FirebaseTest from "./components/views/firebase/uploadtest";
import Mypage from "./components/views/mypage/MyPage";
import WorldcupMain from "./components/views/worldcup/WorldcupMain";
import WorldcupVote from "./components/views/worldcup/vote/Vote";
import WorldcupResult from "./components/views/worldcup/WorldcupResult";
import Worldcupparticipation from "./components/views/worldcup/Worldcupparticipation";
import VideoDetail from "./components/views/VideoDetail/VideoDetail";
import Danddaloading from "./components/views/dandda/danddaresult/Danddaloading";
import Download from "./components/views/download/download.jsx";
import UserDelete from "./components/views/Signup/Unregister.jsx";


export const UserContext = createContext();

function App() {
  const [auth, setAuth] = useState({
    id: '',
    name: '',
    email: ''
  })
  const value = {
    auth: auth,
    setAuth: setAuth
  }
  const temp = Auth(DanddaMain, null);
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
    if (localStorage.getItem('UserId')) {
      setAuth({
        id: localStorage.getItem('UserId'),
        name: localStorage.getItem('UserName'),
        email: localStorage.getItem('UserEmail')
      })
    }
  }, []);

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route exact={false} path="/download" element={<Download />} />
          <Route exact={true} path="/" element={<DanddaMain />} />
          <Route exact={true} path="/login" element={<LoginPage />} />
          <Route exact={true} path="/find" element={<Find />} />
          <Route exact={true} path="/find_id" element={<FindId />} />
          <Route exact={true} path="/find_id_ok" element={<FindIdComplete />} />
          <Route exact={true} path="/find_password" element={<FindPassword />} />
          <Route exact={true} path="/find_password_ok" element={<FindPasswordComplete />} />
          <Route exact={true} path="/signup" element={<SignUp />} />
          <Route exact={true} path="/joinend" element={<JoinEnd />} />
          <Route exact={true} path="/signup/next" element={<SignUpNext />} />
          <Route exact={true} path="/user/delete" element={<UserDelete />} />
          <Route exact={true} path="/user/update" element={<PutCredentials />} />
          <Route exact={true} path="/community/:id" element={<ArticleDetail />} />
          <Route exact={true} path="/:id" element={<DanddaResult />} />
          <Route exact={true} path="/:id/upload" element={<DanddaUpload />} />
          <Route exact={true} path="/:id/upload/complete" element={<DanddaUploadComplete />} />
          <Route exact={true} path="/firebase" element={<FirebaseTest />} />
          <Route exact={true} path="/mypage/:id" element={<Mypage />} />
          <Route exact={true} path="/worldcup" element={<WorldcupMain />} />
          <Route exact={true} path="/worldcup/participation" element={<Worldcupparticipation />} />
          <Route exact={true} path="/worldcup/vote" element={<WorldcupVote />} />
          <Route exact={true} path="/worldcup/vote/result" element={<WorldcupResult />} />
          <Route exact={true} path="/danddaloading" element={<Danddaloading />} />
          <Route exact={true} path="/video/:vid" element={<VideoDetail />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
