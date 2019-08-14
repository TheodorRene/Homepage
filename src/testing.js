import React, { useState } from 'react';
import './testing.css';


function TestCards(props){
    return (
        <div className="container">
            <Card txt={"example text"}image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image = {"https://image.shutterstock.com/z/stock-photo--micro-peacock-feather-hd-image-best-texture-background-colourful-indian-peacock-feather-1127238584.jpg"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
            <Card image={"https://picsum.photos/200/300"}/>
        </div>
    )
}
export default function Card(props){
    const getYear = () => new Date(props.date).getFullYear()
    const getMonth = () => monthName(new Date(props.date).getMonth())
    const monthName = i => {
        switch (i) {
            case 0:
                return 'Januar'
            case 1:
                return 'Februar'
            case 2:
                return 'Mars'
            case 3:
                return 'April'
            case 4:
                return 'Mai'
            case 5:
                return 'Juni'
            case 6:
                return 'Juli'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'Oktober'
            case 10:
                return 'November'
            case 11:
                return 'Desember'
            default:
                return
        }
    }
    return (
        <div className="cardTest" onClick={ () => window.location.href = props.link } >
            <h3 className= "titleTest"> {props.title} </h3>
            <div className="imageContainer">
                <img alt="random" src={props.img}/>
            </div>
            <p className="textTest"> {props.text}{getMonth()}{getYear()}</p>
        </div>
    )
}


