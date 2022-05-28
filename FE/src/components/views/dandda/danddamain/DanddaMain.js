/**
 * 댄따 메인페이지
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-02-01
 * 
 **/


import React from 'react';
import './DanddaMain.css';
import DanddaContent1 from './basic/DanddaContent';
import DanddaContent2 from './swp/DanddaContent';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

function DanddaMain() {
    return (
        <div className='DanddaMain'>
            <h2 style={{ marginTop: '20px', marginBottom:'0px', color:'#6200EE' }}
            ># 기본기부터 배우는 힙합</h2>
            <div className='Carousel' style={{ paddingTop: '0px'}} >
                <DanddaContent1/>
            </div>
            <h2 style={{ marginTop: '10px', marginBottom:'0px',color:'#6200EE' }}>
                # 스우파 쌤들한테 배워볼래?</h2>
            <div className='Carousel' style={{ paddingTop: '0px'}}>
                <DanddaContent2/>
            </div>
        </div>
    );
}

export default DanddaMain;