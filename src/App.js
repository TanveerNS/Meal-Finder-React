import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [meals, setMeals] = useState([]);
  const [searchMeal, setSearchMeal] = useState('pizza');
  const [error, setError] = useState(false);
  let ingredients = [];

  const fetchMoviesHandler = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchMeal
      );

      const data = await response.json();

      if (data.meals === null) {
        throw new Error('Something went wrong!');
        setMeals([]);
        setError(true);
      }

      setMeals(data.meals);
      console.log(data.meals);
      setError(false);
    } catch (error) {
      console.log(error.message);
      console.log('error message');
      setMeals([]);
      setError(true);
    }
  };

  const mealSearchSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    setSearchMeal(event.target[0].value);
    fetchMoviesHandler();
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  return (
    <div className="container">
      <h1>Meal Finder</h1>
      <form className="flex" onSubmit={mealSearchSubmit} id="submit">
        <input
          type="text"
          id="search"
          placeholder="Search for meals or keywords"
        />
        <button className="search-btn" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
      {error && <p>There are no search results, Try again!</p>}
      {!error &&
        meals.map((meal) => (
          <div>
            <div className="single-meal">
              <h1>{meal.strMeal}</h1>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="single-meal-info">
                {meal.strCategory ? (
                  <p>
                    <b>Category: </b>
                    <i>{meal.strCategory}</i>
                  </p>
                ) : (
                  ''
                )}
                {meal.strArea ? (
                  <p>
                    <b>Country: </b>
                    <i>{meal.strArea}</i>
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className="main">
                <p>{meal.strInstructions}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
