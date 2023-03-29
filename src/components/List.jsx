// Functionallity:
//         Used to get data from fetch component and pass it to Ingredientslist component for lists creations and used for modifications of them.
// 
// Parent:
//         Fetch.js
// 



import React from 'react';
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";

import IngridientsList from './IngridientsList';
import { Url } from '../assets/Url';
import { card , cardhead, cardheadbuttons, cardheaddeletebuttons, cardheadeditbuttons, Ingridientshead, recipetitle, ulstyle} from '../assets/Style';




const List = ({trainees}) => {
    const navigate = useNavigate();

    const deleteitem = async(id) =>{
        await axios.delete(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}${id}`);
        navigate('/itemadded');
    }

    
    
    

    return( <div style={card}>
        <div style={cardhead}><div><h4 style={recipetitle}>{trainees.id}</h4></div><div style={cardheadbuttons}><Link to={`/update/${trainees.id}`}><button style={cardheadeditbuttons}>edit</button></Link><button onClick={()=> deleteitem(trainees.id)} style={cardheaddeletebuttons}>delete</button></div></div>
        <h3 style={Ingridientshead}>Ingridients</h3>
        <ul style={ulstyle} key={trainees.id}>
            {
                trainees.ingridients.map((item,index) =>(
                    <IngridientsList ind={index} item={item} id={trainees.id}/>
                    
                ))
            }
        </ul> 
          
    </div>);
}

export default List;