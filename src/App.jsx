import React, { useState } from "react";
import Card from "./Card";

function App() {
  const [places, setPlaces] = useState([])
 

  async function search(formData) {
  const queryText = formData.get("query");

  try {
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `query SearchForPlace($query: String) {
          searchForPlace(query: $query) {
            displayName {
               text
               languageCode
            }
            name
            formattedAddress
            primaryType
            photos {
              url
            }
          }
        }`,
        variables: {
          query: queryText
        }
      })
    });

    const json = await res.json();
    const results = json.data.searchForPlace;

    // Normalize results to fit your Card props
    const parsedPlaces = results.map(place => ({
      name: place.displayName.text,
      address: place.formattedAddress,
      type: place.primaryType,
      image: place.photos?.[0]?.url || "default.jpg" // Fallback if no image
    }));

    setPlaces(parsedPlaces);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

 console.log(places)

  async function filterByType(type) {
  

  try {
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `query SearchForPlace($query: String) {
          searchForPlace(query: $query) {
            displayName {
               text
               languageCode
            }
            name
            formattedAddress
            primaryType
            photos {
              url
            }
          }
        }`,
        variables: {
          query: type
        }
      })
    });

    const json = await res.json();
    const results = json.data.searchForPlace;

    // Normalize results to fit your Card props
    const parsedPlaces = results.map(place => ({
      name: place.displayName.text,
      address: place.formattedAddress,
      type: place.primaryType,
      image: place.photos?.[0]?.url || "default.jpg" // Fallback if no image
    }));

    setPlaces(parsedPlaces);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

  async function getFree() {
  

  try {
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `query SearchForPlace($query: String) {
          searchForPlace(query: $query) {
            priceLevel
        }`,
        variables: {
          query: null
        }
      })
    });

    const json = await res.json();
    const results = json.data.searchForPlace;

    // Normalize results to fit your Card props
    const parsedPlaces = results.map(place => ({
      name: place.displayName.text,
      address: place.formattedAddress,
      type: place.primaryType,
      image: place.photos?.[0]?.url || "default.jpg" // Fallback if no image
    }));

    setPlaces(parsedPlaces);
  } catch (err) {
    console.error("Fetch error:", err);
  }
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


    <button className="border" onClick={() => filterByType("parks")}>parks</button>
    <button className="border" onClick={() => filterByType("library")}>library</button>
    <button className="border" onClick={() => filterByType("cafe")}>cafe</button>
    <form action={search}>
      <input name="query" className="border" type="search" id="search" placeholder="search"/>
      <button className="border">Search</button>
    </form>
      {cards}
    </>
  )
}

export default App
