import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import trophy from './img/trophy.png'

function WorldcupResult(props) {

  const [rankers, setRankers] = useState([]);

  useEffect(() => {
    axios.get(`/cup/list/${1}`)
    .then(res => {
      console.log(res.data)
      setRankers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div style={{
      display: 'flex', 
      flexDirection:'column',
      justifyContent: 'center', 
      alignItems: 'center' 
      , width: '100%', height: '88vh'
  }}>
      <img src={trophy} alt="trophy"
      style={{width:'100px', height:'100px'}}/>
      <br/>
      <h2>현재까지의 랭킹</h2>
      <br/>      
      <table style={{textAlign:'center'}}>
        <tr>
          <th>순위</th>
          <th>채널명</th>
          <th>영상제목</th>
          <th>승률</th>
        </tr>
        {rankers.map((ranker, index) => (
        <tr>
          <td>{index+1}</td>
          <td>{ranker.videos2.users.name}</td>
          <td>{ranker.videos2.title}</td>
          {ranker.rate ? (<td>{Math.round(ranker.rate)}%</td>) : (<td>{ranker.rate}%</td>)}
          {/* <td>{(ranker.rate).toFixed(0)}%</td> */}
          </tr>
        ))}        
      </table>
    </div>
  );
}

export default WorldcupResult;