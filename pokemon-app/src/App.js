import React, { Component } from 'react';
import './App.css';


class App extends Component {
  state = {
    pokemonsList: [],
    limit: 10,
    type: "all"
  }

  handleChange = (event) => {
    let inputName = event.target.name
    let eventResult = event.target.value
    let pokemonLimit = this.state.limit;
    let pokemonType = this.state.type;
    if (inputName === "types") {
      pokemonType = eventResult
    } else {
      pokemonLimit = Number(eventResult)
    }
    this.setState({
      limit: pokemonLimit,
      type: pokemonType
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchPokemons();
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  fetchPokemons = () => {
    let userChoice = this.state.limit;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${userChoice}`)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        this.fetchApokemon(data)
      });
  }
  fetchApokemon = (data) => {
    const pokemonData = data.results;
    let pokemonsPromises = pokemonData.map(poke => {
      return fetch(poke.url).then(res => res.json())
        .then(pokeInfo => {
          return pokeInfo
        })
    });
    // All promises are received
    Promise.all(pokemonsPromises).then((results) => {
      this.setState({
        pokemonsList: results
      })
    })
  }
  fetchPokemonType = () => {
    const type = this.state.type
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Kanto Pokemon</h1>
        <div>
          <form className="searchForm" onSubmit={this.handleSubmit}>

            <label htmlFor="pokemonTypes">Choose a type:</label>

            <select name="types" id="types" onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="normal">Normal</option>
              <option value="fighting">Fighting</option>
              <option value="flying">Flying</option>
              <option value="poison">Poison</option>

              <option value="ground">Ground</option>
              <option value="rock">Rock</option>
              <option value="bug">Bug</option>
              <option value="ghost">Ghost</option>

              <option value="steel">Steel</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>

              <option value="electric">Electric</option>
              <option value="psychic">Psychic</option>
              <option value="ice">Ice</option>
              <option value="dragon">Dragon</option>

              <option value="dark">Dark</option>
              <option value="fairy">Fairy</option>
              <option value="unknown">Unknown</option>
              <option value="shadow">Shadow</option>
            </select>

            {/* <input type="search" id="psearch" name="psearch" placeholder="butterfree"></input> */}

            <label htmlFor="gsearch">Amount:</label>
            <input type="number" min="1" id="quantity" placeholder="15" name="quantity" onChange={this.handleChange}></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div className="pokemonContainer">
          {
            this.state.pokemonsList.map((pokemon) => {
              return (
                <div className="boxContainer" key={pokemon.id}>
                  <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={`this is ${pokemon.name}the pokemon`}></img>
                  <div className="textDescription">
                    <h2>{pokemon.name}</h2>
                    <p>#{pokemon.id}</p>
                    {
                      pokemon.types.map(typeName => {
                        return (
                          <ul key={typeName.slot}>
                            <li>{typeName.type.name}</li>
                          </ul>
                        )
                      })
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
