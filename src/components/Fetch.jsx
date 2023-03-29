// Functionallity:
//         Used to fetch data from server and pass it to list component for Card creation
// 
// Parent:
//         App.js
// 
// child:
    // List.js 

import  { React, useEffect, useState } from 'react';

import axios from 'axios';
import { SyncLoader } from 'react-spinners';

import List from './List';
import { Url } from '../assets/Url';
import { container } from '../assets/Style';


const Fetch = () => {

    
    const [trainees,setTrainee]=useState([]);
    
    const fetchData= async() => {
        let {data} = await axios.get(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}`)
        setTrainee(data)
    }

    useEffect (()=>{
        fetchData()
    },[]);

    return <div>
    {trainees.length>0?<div style={container}>
    {trainees.map(item => (
<List trainees={item} key={item.id} />))}
</div> : <div style={{"margin" : "50px"}}><SyncLoader color={"maroon"} /></div> }</div>
}

export default Fetch;

