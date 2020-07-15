import React from 'react'
import Cocktail from '../components/Cocktail'
const CocktailList = (props) => {
  if (props.loading) {
    return (
      <h2 className="section-title">Loading...</h2>
    )
  }
  else if (props.cocktail.length < 1) {
    return (
      <h2 className="section-title">Ooops!!! No cocktail matched your search criteria</h2>
    )
  }
  return <section className="section">
    <h2 className="section-title">Cocktails</h2>
    <div className="cocktails-center ">
      {props.cocktail.map(item => (
        <Cocktail key={item.id} {...item} />
      ))}
    </div>
  </section>
}

export default CocktailList
