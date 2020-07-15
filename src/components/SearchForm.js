import React, { useRef, useEffect } from 'react'

const SearchForm = (props) => {
  const searchValue = useRef("")

  useEffect(() => {
    searchValue.current.focus()
  }, [])

  const formSubmitted = e => {
    e.preventDefault();
  }
  const nameChanged = () => {
    props.value(searchValue.current.value)
  }
  return (
    <section className="section">
      <h2 className="section-title">Search Coccktai</h2>
      <form className="form search-form" onSubmit={formSubmitted}>
        <div className="form-control">
          <label htmlFor="name">
            Serach your Favourite Cocktail
  </label>
          <input type="text" id="name" name="name" onChange={nameChanged} ref={searchValue} autoComplete="off" />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
