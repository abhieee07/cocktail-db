import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)
  useEffect(() => {
    setLoading(true)
    async function getCocktail() {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        if (response.data.drinks) {
          console.log(response.data.drinks[0])
          const ingredients = [response.data.drinks[0].strIngredient1,
          response.data.drinks[0].strIngredient2,
          response.data.drinks[0].strIngredient3,
          response.data.drinks[0].strIngredient4,
          response.data.drinks[0].strIngredient5]

          const newCocktail = {
            id: response.data.drinks[0].idDrink,
            name: response.data.drinks[0].strDrink,
            image: response.data.drinks[0].strDrinkThumb,
            category: response.data.drinks[0].strCategory,
            glass: response.data.drinks[0].strGlass,
            info: response.data.drinks[0].strAlcoholic,
            instructions: response.data.drinks[0].strInstructions,
            ingredients,
          }
          setCocktail(newCocktail);
        }
      }
      catch (err) {
        console.log(err);
        setLoading(false)
      }
      setLoading(false)
    }
    getCocktail()
  }, [id])

  if (loading) {
    return <h2 className="section-title">Loading...</h2>
  }
  if (!cocktail) {
    return <h2 className="section-title">No cocktail found</h2>
  }
  else {
    const { name, image, category, glass, instructions, ingredients, info } = cocktail;
    console.log(ingredients)
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn-primary btn-details">Go Back</Link>
        <h2 className="section-title ">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info ">
            <p>name : {name}</p>
            <p>category : {category}</p>
            <p>info : {info}</p>
            <p>glass : {glass}</p>
            <p>instructions : {instructions}</p>
            <p>ingredients : {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}</p>
          </div>
        </div>

      </section>
    );
  }
}
