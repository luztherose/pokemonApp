import React, { Component } from 'react';
import './App.css';


class App extends Component {
  state = {
    pokemonsList: [],
    limit: 10,
    typesList: [],
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
    this.fetchPokemonTypes();
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
  fetchPokemonTypes = () => {
    fetch(`https://pokeapi.co/api/v2/type/`)
      .then(res => res.json())
      .then(data => {
        const allTypeList = data.results;
        this.setState({
          typesList: allTypeList
        })
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
            <option value="all"> all</option>
            {
              this.state.typesList.map((item, index) => {
                return (
                  <option key={index} value={`${item.name}`}>{item.name}</option>
                )
              }) 
            }
            </select>

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
