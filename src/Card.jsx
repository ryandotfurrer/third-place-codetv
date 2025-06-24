import React from "react"

function Card(props){
 return (
    <div className="border">
        <h3>Place: {props.placeName}</h3>
        <h3>Address: {props.address}</h3>
        <img src={props.imageUrl}/>
        <h3>Type: {props.type}</h3>
        
    </div>
 )
}


export default Card