import React, { useState } from "react";
import data from "./lib/third-places.json"
import Card from "./Card";

function App() {
  const [places, setPlaces] = useState([])
 

  function search(formData){
    const query = formData.get("query");
    const queryFinds = data.filter(el => el.type.toLowerCase() === query)
    setPlaces([...queryFinds])

  }

  const cards = places.map((place, i) => {
    return (
      <Card key={i} placeName={place.name} address={place.address} type={place.type} imageUrl={place.image}/>
    )
  })

  return (
    <>
    <h1>Third Place Finder</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur repudiandae, eius ratione, reprehenderit ex incidunt, ad nesciunt iure autem voluptatem deserunt perferendis vel voluptas neque ipsa nam dolorem quia asperiores odit? Aspernatur velit eveniet ipsum.</p>

    <form action={search}>
      <input name="query" className="border" type="search" id="search" placeholder="search"/>
      <button className="border">Search</button>
    </form>
      {cards}
    </>
  )
}

export default App
