import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {

  const handleSearchChange = (event) => {
    props.setSearch(event.target.value)
  }

  return (
    <div>
      find countries: <input
        value={props.Search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const Results = (props) => {

  const [choices, setChoices] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setChoices(response.data)
      })
  }

  useEffect(hook, [])

  const handleInput = (e) => {
    props.setSearch(e.target.value);
  }


  let re = new RegExp('(.+)?' + props.search + '(.+)?', 'i')

  const match = choices.filter(e => e.name.search(re) !== -1)

  const hook2 = () => {
    if (match.length === 1) {
      props.setMatch(match[0])
    }
    if (match.length !== 1) {
      props.setMatch('')
    }
  }

  useEffect(hook2,)

  const clear = () => {
    props.setSearch('')
    props.setWeather('')
  }


  if (match.length > 1) {
    return (
      <div>
        <ul>
          {match.map(country =>
            <li key={country.numericCode}>{country.name}
              <button value={country.name}
                onClick={handleInput} >Show</button>
            </li>
          )}
        </ul>
      </div>
    )
  } else if (match.length === 1) {

    return (
      <div>
        <button onClick={clear}>Clear</button>
        <h1>{match[0].name}</h1>
        capital {match[0].capital} <br />
        population {match[0].population}
        <h2>languages</h2>
        <ul>
          {match[0].languages.map((languages, index) =>
            <li key={index}>{languages.name}</li>
          )}
        </ul>
        <img
          src={match[0].flag}
          alt={match[0].name + 'flag'}
          height="20%" width="20%" />
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li>None found</li>
        </ul>
      </div>

    )
  }
}

const Weather = (props) => {

  const match = props.match

  const hook = () => {
    const access_key = props.api_key
    const query = props.match.capital

    axios
      .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`)
      .then(response => {
        props.setWeather(response.data.current)
      })
  }

  useEffect(hook, [])

  if (props.match.capital && props.weather.temperature && props.weather.feelslike) {
    return (
      <div>
        <h2>weather in {props.match.capital ? props.match.capital : 'N/A'}</h2>
        <p>Temperature {props.weather.temperature ? props.weather.temperature + '??C' : 'N/A'}</p>
        <p>Feels like {props.weather.feelslike ? props.weather.feelslike + '??C' : 'N/A'} </p>
        <img src={props.weather.weather_icons} />
        
      </div>
    )
  } else {
    return (
      <div>
        <h2>Weather details not available</h2>
      </div>
    )
  }

  
}


const App = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState('')
  const [match, setMatch] = useState('')
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_WEATHERSTACK



  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
      />
      <Results
        search={search}
        setSearch={setSearch}
        result={result}
        setResult={setResult}
        match={match}
        setMatch={setMatch}
        setWeather={setWeather}

      />

      {match.area && <Weather
          match={match}
          api_key={api_key}
          weather={weather}
          setWeather={setWeather}
        />
      }
    </>
  )
}
export default App;
