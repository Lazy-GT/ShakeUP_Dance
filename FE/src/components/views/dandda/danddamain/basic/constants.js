import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import profile_src from "./img/profile.png";
import { useEffect } from "react";

export const SLIDE_INFO = [
  {
    backgroundImage: `url(${img1})`,
    title: "Slide 1",
    profile_name: "seoyoung",
    profile_src: profile_src,
    id: 1,
  },
  {
    backgroundImage: `url(${img2})`,
    title: "Slide 2",
    profile_name: "seoyoung",
    profile_src: profile_src,
    id: 2,
  },
  {
    backgroundImage: `url(${img3})`,
    title: "Slide 3",
    profile_name: "seoyoung",
    profile_src: profile_src,
    id: 3,
  },
  // { backgroundImage: '#ffe084', title: 'Slide 4' },
  // { backgroundImage: '#d9d9d9', title: 'Slide 5' },
];
