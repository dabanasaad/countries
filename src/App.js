import { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchCountryData = async (countryName) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await res.json();
    setCountries((prevCountries) => [...prevCountries, ...data]);
  };

  return (
    <div>
      <Title />
      <Search onSearch={fetchCountryData} />
      <List countries={countries} />
    </div>
  );
}

function Title() {
  return (
    <div className="bg-gray-500 border border-gray-500 w-full h-36">
      <p className="w-96 mx-auto font-mono whitespace-nowrap mt-10 text-3xl">
        Every Countries Info
      </p>
    </div>
  );
}

function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleValue = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      onSearch(search);
      setSearch(""); // Clear the search input after submission
    }
  };

  return (
    <div className="bg-gray-600 border border-gray-500 w-full h-24">
      <form onSubmit={handleSubmit} className="mx-auto w-96 mt-10">
        <input
          className="w-64 h-9 rounded-xl focus:outline-none"
          type="text"
          placeholder="search..."
          value={search}
          onChange={handleValue}
        />
        <button className="ml-3 rounded-xl w-24 h-8 bg-black text-white">
          Search
        </button>
      </form>
    </div>
  );
}

function List({ countries }) {
  return (
    <div className="py-6 gap-y-8 bg-gray-500 border border-gray-500 w-full h-auto grid  grid-cols-1  lg:grid-cols-3 sm:grid-cols-2">
      {countries.map((country) => (
        <Item key={country.cca3} country={country} />
      ))}
    </div>
  );
}

function Item({ country }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={` text-2xl text-center border w-48 h-44 rounded-xl cursor-pointer ml-40 ${
        isFlipped ? "flipped" : ""
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-inner">
        <div className="card-front">
          <p className="mt-14">{country.name.common}</p>
        </div>
        <div className="card-back text-sm p-2">
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
          <p>Languages: {Object.values(country.languages).join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
function Footer() {
  return <div className=" border border-bl"></div>;
}
export default App;
