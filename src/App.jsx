import React, { useState } from "react";
import data from "./lib/third-places.json";
import Card from "./Card";

function App() {
  const [places, setPlaces] = useState([]);

  function search(formData) {
    const query = formData.get("query");
    const queryFinds = data.filter((el) => el.type.toLowerCase() === query);
    setPlaces([...queryFinds]);
  }

  const cards = places.map((place, i) => {
    return (
      <Card
        key={i}
        placeName={place.name}
        address={place.address}
        type={place.type}
        imageUrl={place.image}
      />
    );
  });

  return (
    <>
      <header className="mx-auto mb-12 place-content-center pt-64">
        <hgroup className="mb-4">
          <h1 className="text-4xl">Third Place Locator</h1>
          <p className="text-2xl">Meet new people, create lasting memories</p>
        </hgroup>

        <form action={search} className="flex w-full gap-x-2">
          <label htmlFor="search" className="sr-only">
            search
          </label>
          <input
            name="query"
            className="w-full"
            type="search"
            id="search"
            placeholder="search"
          />
          <button className="btn btn-primary">Search</button>
        </form>
      </header>
      <section className="space-y-4">{cards}</section>
    </>
  );
}

export default App;
