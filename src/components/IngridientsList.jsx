// Functionallity:
//         Used to take data from List component and pass create list items
// 
// Parent:
//         List.js
//



import {React,useState} from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import { Url } from '../assets/Url';
import { cardheaddeletebuttons, cardheadeditbuttons, cardheadsubmitbuttons, listyle } from '../assets/Style';



const IngridientsList = (props) => {
        const [numFields, setNumFields] = useState(1);
        const [itm, setItm] = useState(props.item);
        const [flag ,setFlag] = useState(false)
        const [updateditem ,setUpdate] = useState('');
        const navigate = useNavigate();
        
        function addTextField() {
            setFlag(true);
            setNumFields(numFields + 1);
            setItm(Array.from({ length: numFields }, (_, i) => (
              <input type="text" key={i} onChange={changeText}/>
            ))) 
          }
        
        const changeText= (event)=>{
            setUpdate(event.target.value)
        }

        const Submititem = async()=>{
            setFlag(false);
            setItm(updateditem)
            console.log("up",updateditem)
            let {data} = await axios.get(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}`)
            data = data.filter(ele => ele.id === props.id)
             let ingridients = data[0].ingridients.map(ele => {return ele === props.item ? updateditem : ele; } );
            await axios.put(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}${props.id}`,{id:data.id,ingridients:ingridients})
            navigate('/itemadded');
        }

    

        const deleteitem = async() =>
        {
            let {data} = await axios.get(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}`)
            data = data.filter(ele => ele.id === props.id)
            let ingridients = data[0].ingridients.filter(ele => ele !== props.item);
            await axios.put(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}${props.id}`,{id:data.id,ingridients:ingridients})
            navigate('/itemadded');
        }
        const canceledit = async() =>
        {
            navigate('/itemadded');
        }


    return (
        
        <li key={props.ind}  style={listyle}>
            <span>{itm}</span>
            {flag === false ?<><span><button onClick={addTextField} style={cardheadeditbuttons}>edit</button></span> <span><button onClick={deleteitem} style={cardheaddeletebuttons}>delete</button></span></>:<><span><button onClick={Submititem} style={cardheadsubmitbuttons}>Save</button></span><span><button onClick={canceledit} style={cardheaddeletebuttons}>Cancel</button></span></>}
           
        </li>
    );

}




export default IngridientsList;