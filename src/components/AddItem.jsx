// Functionallity:
//         Used to get input in a form and update or add it to data base accordingly
// 
// Parent:
//         App.js





import React from 'react';


import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios';


import { Url } from '../assets/Url';
import { form, forminput, formsubmit } from '../assets/Style';
import Swal from 'sweetalert2';


const AddItem = () => {
    let {id} = useParams();
    const {register,handleSubmit,setValue} = useForm();
    const navigate = useNavigate();
    
    const fetchData= async() => {
        let {data} = await axios.get(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}${id}`)
        let str='';
        (data.ingridients).forEach(element => {
            str+=element+',';
        });
        setValue('id',data.id)
        setValue('ingridients',str)
    }
    if(id){
        fetchData();
    }

    const onSubmit=async(data)=>{
        if(id)
        {
            let ingridients = data.ingridients.split(",");
            ingridients = ingridients.filter(ele => ele !== "")
            await axios.put(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}${id}`,{id:data.id,ingridients:ingridients})
            Swal.fire(`${data.id} updated sucessfully `)
        }
        else{
            let ingridients = data.ingridients.split(",");
            await axios.post(`${Url.BASE_BACKEND}${Url.BACKEND_DBNAME}`,{id:data.id,ingridients:ingridients});
            Swal.fire(`${data.id} added sucessfully `)
        }
        navigate('/itemadded');
        
    }
    return <div>
        <h1>{id?'Update':'Add'} Item</h1>
        <div>
        <form onSubmit={handleSubmit(onSubmit)} style={form}>
                <div>
                    <label>Name :</label>
                    <div><input type="text" {...register('id')} style={forminput}/>
                    </div>
                </div>
                <div >
                    <label >Ingredient:</label>
                    <div><input type="text"  {...register('ingridients')} style={forminput}/>
                </div>
                </div>
                <button type="submit" style={formsubmit}>submit</button>
            </form>
            </div>
    </div>;
}



export default AddItem;