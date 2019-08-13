import React, { useState } from 'react';
import './testing.css';


export default function TestCards(props){
    return (
        <div className="container">
            <TestCard />
            <TestCard />
            <TestCard />
            <TestCard />
        </div>
    )
}
function TestCard(props){
    return (
        <div className="cardTest" >
            <h3 className= "titleTest"> Title </h3>
            <div className="imageContainer">
                <img alt="random" src="https://picsum.photos/300/300"/>
            </div>
            <p className="textTest"> Hello </p>
        </div>
    )
}


