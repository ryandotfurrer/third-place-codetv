import React, { useState } from "react";
import Card from "./Card";

function App() {
  const [places, setPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  async function search(e) {
    e.preventDefault(); // Prevent form submission

    // Clear active filter if search value doesn't match any filter
    if (
      searchValue !== "parks" &&
      searchValue !== "library" &&
      searchValue !== "cafe"
    ) {
      setActiveFilter(null);
    }

    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            query: searchValue,
          },
        }),
      });

      const json = await res.json();
      const results = json.data.searchForPlace;

      // Normalize results to fit your Card props
      const parsedPlaces = results.map((place) => ({
        name: place.displayName.text,
        address: place.formattedAddress,
        type: place.primaryType,
        image: place.photos?.[0]?.url || "default.jpg", // Fallback if no image
      }));

      setPlaces(parsedPlaces);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  console.log(places);

  async function filterByType(type) {
    setActiveFilter(type); // Set the active filter
    setSearchValue(type); // Update the search input to match the filter
    try {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            query: type,
          },
        }),
      });

      const json = await res.json();
      const results = json.data.searchForPlace;

      // Normalize results to fit your Card props
      const parsedPlaces = results.map((place) => ({
        name: place.displayName.text,
        address: place.formattedAddress,
        type: place.primaryType,
        image: place.photos?.[0]?.url || "default.jpg", // Fallback if no image
      }));

      setPlaces(parsedPlaces);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  async function getFree() {
    const keywords = [
      "library",
      "park",
      "church",
      "mosque",
      "synagogue",
      "hindu_temple",
      "shopping_mall",
    ];
    const allResults = [];

    for (const term of keywords) {
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            query: term,
          },
        }),
      });

      const json = await res.json();
      const results = json.data.searchForPlace;

      const parsed = results.map((place) => ({
        name: place.displayName.text,
        address: place.formattedAddress,
        type: place.primaryType,
        image: place.photos?.[0]?.url || "default.jpg",
      }));

      allResults.push(...parsed);
    }

    setPlaces(allResults);
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
      <header className="mb-6 pt-64">
        <hgroup>
          <h1 className="text-4xl">The Spot</h1>
          <p className="text-xl">
            Find your third place to meet new folks and make lasting memories
          </p>
        </hgroup>
      </header>
      <div className="mb-2 flex gap-x-2">
        <button
          className={`btn rounded-full border ${
            activeFilter === "free"
              ? "border-blue-500 bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => getFree()}
        >
          free
        </button>
        <button
          className={`btn rounded-full border ${
            activeFilter === "parks"
              ? "border-blue-500 bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => {
            console.log("hello");
            filterByType("parks");
          }}
        >
          parks
        </button>
        <button
          className={`btn rounded-full border ${
            activeFilter === "library"
              ? "border-blue-500 bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => filterByType("library")}
        >
          library
        </button>
        <button
          className={`btn rounded-full border ${
            activeFilter === "cafe"
              ? "border-blue-500 bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => filterByType("cafe")}
        >
          cafe
        </button>
      </div>
      <form onSubmit={search} className="grids mb-12 space-y-4">
        <div className="flex gap-x-2">
          <input
            name="query"
            type="search"
            id="search"
            placeholder="search"
            className="w-full"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              // Clear active filter if search value doesn't match any filter
              if (
                e.target.value !== "parks" &&
                e.target.value !== "library" &&
                e.target.value !== "cafe"
              ) {
                setActiveFilter(null);
              }
            }}
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
      <section className="space-y-4">{cards}</section>
    </>
  );
}

export default App;
