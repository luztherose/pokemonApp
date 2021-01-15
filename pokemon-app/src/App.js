import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    pokemonsList: []
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=10&limit=10")
      .then(response => response.json())
      .then(data => {
        const pokemonData = [...data.results];

        pokemonData.map(poke => {
          return fetch(poke.url).then(res => res.json())
            .then(pokeInfo => {
              const pokemonsList = this.state.pokemonsList
              pokemonsList.push(pokeInfo)
              this.setState({
                pokemonsList: pokemonsList,
              });
            });
        });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Kanto Pokemon</h1>
        <div className="pokemonContainer">
          {
            this.state.pokemonsList.map((pokemon) => {
              return (
                <div className="boxContainer">
                  <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}></img>
                  <div className="textDescription">
                    <h2>{pokemon.name}</h2>
                    <p>#{pokemon.id}</p>
                    {
                      pokemon.types.map(typeName => {
                        return (
                      <ul>
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
