import React, { useState, useEffect } from 'react';
import CarouselSlide from '../CarouselSlide';
import {useNavigate} from 'react-router-dom';
import { FaAndroid, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slide from '@material-ui/core/Slide';
import img1 from './img/1.png'
import img2 from './img/2.jpg'
import img3 from './img/3.png'
import profile1 from './img/profile1.jpg'
import profile2 from './img/profile2.jpg'
import profile3 from './img/profile3.jpg'
import axios from 'axios';



function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = 
    direction === 'left' ? (
    <FaChevronLeft style={{color: '6200EE'}}/>
    ) : (
    <FaChevronRight style={{color: '6200EE'}} />
    );

    return <div onClick={clickFunction}>{icon}</div>;
}

function DanddaContent () {
    // axios로 댄서 이미지, 섬네일, 정보 받아오기

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        }
    
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    

const SLIDE_INFO = [
    { 
        backgroundImage: `url(${img3})`, 
        title: '리정쌤한테 배우는 넥스트레벨', 
        profile_name: '리정', 
        profile_src: profile3, 
        id: 5,
        uid: 3,
        url: 'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644628887913?alt=media&token=353a4404-0b62-405c-b2f7-6fa7b0c77b66',
        turl: 'https://teachablemachine.withgoogle.com/models/BVupLxFSj/'
      },
      { 
        backgroundImage: `url(${img2})`, 
        title: '허니제이힙합', 
        profile_name: '허니제이', 
        profile_src: profile2,
        id: 6,
        uid: 4,
        url: 'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F1644629343168?alt=media&token=fd565c13-cefd-4262-abfa-3b581ad3aa22',
        turl: 'https://teachablemachine.withgoogle.com/models/VDbRKik9o/'
      },
      { 
        backgroundImage: `url(${img1})`, 
        title: '비보잉댄스', 
        profile_name: '예리', 
        profile_src: profile1,
        id: 7,
        uid: 5,
        url: 'https://firebasestorage.googleapis.com/v0/b/dance-704a8.appspot.com/o/videos%2F12345.mp4?alt=media&token=b2d33474-a957-49b1-946c-a699cc9f6209',
        turl: ''
      },
    ];

    const [index, setIndex] = useState(0);
    const content = SLIDE_INFO[index];
    const numSlides = SLIDE_INFO.length;

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const navigate = useNavigate();

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };

    return (
        <div className='DanddaMain'>
            {/* 해당 캐로셀을 클릭 시 카메라 이동 함수 실행 */}
            <div className='Carousel' 
            // onClick={movecamera}
            >
                <Arrow
                    direction='left'
                    clickFunction={() => onArrowClick('left')}
                />
                <Slide in={slideIn} direction={slideDirection}>
                    <div>
                        <CarouselSlide content={content} />
                    </div>
                </Slide>
                <Arrow
                    direction='right'
                    clickFunction={() => onArrowClick('right')}
                />
            </div>
        </div>
    );
}

export default DanddaContent;