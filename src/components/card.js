import React from 'react';
import './css/card.css';


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
            <h3 className="titleTest"> {props.title} </h3>
            <h3 className="subtitle"> {getMonth()} {getYear()} </h3>
            <hr/>
            <div className="imageContainer">
                <img alt="image related to project" src={props.img}/>
            </div>
            <hr/>
            <p className="textTest"> {props.text} </p>
        </div>
    )
}


