import React from "react";

function Card(props) {
  return (
    <div className="bg-card grid grid-cols-1 space-y-4 rounded-lg border p-4 md:grid-cols-2">
      <header>
        <a>
          <h2 className="text-xl">{props.placeName}</h2>
        </a>
        <a>
          <address className="text-sm not-italic outline">
            {props.address}
          </address>
        </a>
      </header>
      <div className="md:h-fit md:justify-self-end">
        {/* <span>free</span> */}
        <div className="text-background w-fit rounded-md bg-amber-800 px-2 py-1">
          <span className="text-white">$</span>
          <span>$</span>
          <span>$</span>
          <span>$</span>
        </div>
      </div>
      <span className="text-sm lowercase italic">{props.type}</span>
    </div>
  );
}

export default Card;
