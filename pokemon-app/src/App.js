import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    pokemonsList: [],
    limit: 10
  }

  handleChange = (event) => {
    const pokemonLimit = event.target.value
    this.setState({
      limit: Number(pokemonLimit)
    });
}

handleSubmit = (e) =>  {
  e.preventDefault();
  this.fetchPokemon();
}

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = () => {
    let userChoice = this.state.limit;
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${userChoice}&limit=${userChoice}`)
      .then((response)=> {
        return response.json()
      })
      .then(data => {
        const pokemonData = data.results;
        let pokemonsPromises = pokemonData.map(poke => {          
          return fetch(poke.url).then(res => res.json())
            .then(pokeInfo => {
              return pokeInfo
            })
        });
        // All promises are received
        Promise.all(pokemonsPromises).then((results) => {
          console.log("7")
          this.setState({
            pokemonsList:results
          })
        })
        .catch(error => console.log(`Error in promises ${error}`))
      });
  }

  render() {
    return (
      <div className="wrapper"> 
        <h1>Kanto Pokemon</h1>
        <div>
          <form className="searchForm" onSubmit={ this.handleSubmit }>
            <label htmlFor="gsearch">Search by name:</label>
            <input type="search" id="psearch" name="psearch"></input>
            <label htmlFor="gsearch">Amount:</label>
            <input type="number" min="1" id="quantity" name="quantity"  onChange={ this.handleChange }></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div className="pokemonContainer">
          {
            this.state.pokemonsList.map((pokemon) => {
              return (
                <div className="boxContainer" key={ pokemon.id }>
                  <img src={`https://pokeres.bastionbot.org/images/pokemon/${ pokemon.id }.png`} alt={`this is ${ pokemon.name }the pokemon`}></img>
                  <div className="textDescription">
                    <h2>{ pokemon.name }</h2>
                    <p>#{ pokemon.id }</p>
                    {
                      pokemon.types.map(typeName => {
                        return (
                          <ul key={ typeName.slot }>
                            <li>{ typeName.type.name }</li>
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
