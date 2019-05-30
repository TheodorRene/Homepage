import React from 'react'
function FormEntry(props){
    const input = 
        (
                <div className="row">
                    <div className="input-field col s12">
                        <input id={props.id} type="text" value={props.val} onChange={props.onChange} />
                        <label htmlFor={props.id}>{props.text}</label>
                    </div>
                </div>
        )
    const button = (
        <div >
            <button type="submit" className="waves-effect waves-light btn">{props.text}</button>
        </div>
    )
    if (props.type==="button") {
        return (
            button
        )
    } 
    if (props.type==="input"){
        return (
            input
        )
    }
}

export {FormEntry}
