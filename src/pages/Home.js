import React, { useState, useEffect } from "react";
import Searchfrom from '../components/SearchForm'
import CocktailList from '../components/CocktailList'
import axios from 'axios'

export default function Home() {
  let [loading, setLoading] = useState(false)
  let [search, setSearch] = useState("sa")
  let [cocktail, setCocktail] = useState([])
  useEffect(() => {
    setLoading(true)
    async function getDrinks() {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        if (response.data.drinks) {
          const newCocktail = response.data.drinks.map(item => {
            return {
              id: item.idDrink, name: item.strDrink, image: item.strDrinkThumb, info: item.strAlcoholic, glass: item.strGlass
            }
          })
          setCocktail(newCocktail);
        }
        else {
          setCocktail([])
        }
      }
      catch (err) {
        console.log(err);
        setLoading(false)
      }
      setLoading(false)
    }
    getDrinks()
  }, [search])
  return (
    <main>
      <Searchfrom value={setSearch} />
      <CocktailList loading={loading} cocktail={cocktail} />
    </main>
  )
}
