import React from "react";
import './main.css';
import m1 from '../../components/assets/p1.png';
import {Link, useNavigate} from 'react-router-dom'
const Main = () =>{
        const Navigate = useNavigate();
    return(
        <div className="body">
            <div className="text">
                <div className="t1">
                    <p className="h1">
                        Move your packages <br/> with us.
                    </p>
                    <p className="t1">Safely move your belongings to your desired places<br/> through
                    our bus route in a fair price</p>
                </div>
                <div className="t2">
                    <button onClick={()=> Navigate("/form")} className="button">Move My Package!</button><br/><br/>
                    <p className="a1"><Link to="/tracking">Track My Package</Link></p>
                </div>
            </div>
            <div className="image">
                <img className="m1" src={m1}/>            </div>
        </div>
        
    )
}

export default Main;