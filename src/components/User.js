import { useState } from "react";

export const User =() =>{
    const [count]=useState(0);
    const [count2]=useState(1);
    return (
        <div className="user-card">
            <h2>Count: {count}</h2>
            <h2>Count: {count2}</h2>
            <h1>Name: Alekhya </h1>
            <h3>Location: Gangavathi</h3>
            <h3>Contact: aleke</h3>
        </div>
    )
    
}

export default User;
