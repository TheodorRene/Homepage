import React, { useState } from 'react';
import './testing.css';


export default function TestCards(props){
    return (
        <div className="container">
            <TestCard />
            <TestCard />
        </div>
    )
}
function TestCard(props){
    return (
        <div className="cardTest" >
            <img alt="random" src="https://picsum.photos/200/300"/>
            <p> Hello </p>
        </div>
    )
}


