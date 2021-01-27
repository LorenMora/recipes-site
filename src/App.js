import React, { useEffect, useState } from "react";
import Recipe from './recipe';
import './App.css';

const App = () => {

  const appId = "28eb0f4e";
  const appKey = process.env.REACT_APP_API_KEY;
  
  const [ recipes, setRecipes ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ query, setQuery ] = useState("");

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value)
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return(
    <div className="app">
      <form className="search-form" onSubmit={getSearch} >
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit" >
        Search
      </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => ( // using () instead of {} b/c we're returning JSX
          <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories}
          image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} key={recipe.recipe.label} />
        ))}
      </div>
    </div>  
  );
}

export default App;