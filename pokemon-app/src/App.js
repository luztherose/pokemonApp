import React, { Component } from 'react';
import Modal from "./Modal"
import './App.css';


class App extends Component {
  state = {
    pokemonsList: [],
    limit: 10,
    typesList: [],
    type: "all",
    isLoading: true,
    isEqual: 0,
    isModalVisible: false
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
    this.setState({
      isLoading: true
    })
    if( this.state.type !== "all" && this.state.limit > 0 ) {
      this.fetchPokemonsByType();
    }else {
      this.fetchPokemons();
    }
  }

  handleLoader = () => {
    let className = ""
    if(this.state.isLoading) {
      className ="loader"
    }else {
      className ="hide-loader"
    }
    return className;
  }

  handleInputFields = () =>  this.state.isLoading;
  
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
        this.fetchApokemon(data.results)
      });
  }

  fetchApokemon = (pokemonData) => {
    let pokemonsPromises = pokemonData.map(poke => {
      return fetch(poke.url).then(res => res.json())
        .catch(error => console.log(error))
    });
    // All promises are received
    Promise.all(pokemonsPromises).then((results) => {
      /// end loading
      this.setState({
        isLoading: false,
        pokemonsList: results,
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

  fetchPokemonsByType = () => {
    const type = this.state.type
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(res => res.json())
    .then((data) => {
      const limitNumber = this.state.limit
      const limitedPokemons = data.pokemon
        .slice(0, limitNumber)
        .map((item) => item.pokemon)

      this.fetchApokemon(limitedPokemons)
    })
    .catch( error => console.log(error)
    ) 
  }

  handleModalClassName = () => {
    let className = ""
    if( this.state.isModalVisible ) {
      className = "modal"
    }else {
      className = "modalHide"
    }
    return className;
  }
  closeModal = () => {
    this.setState({
      isModalVisible:false
    });
  }
alertModal = (event) => {
  let target = event.target;
  console.log(target)
  this.setState({
    isModalVisible:true
  });
}
  render() {
    
    return (
      <div className="wrapper">
        <h1>Kanto Pokemon</h1>
        <div className={ this.handleLoader() } id="loader">
        </div>
        <fieldset disabled ={ this.handleInputFields() }>
          <form className="searchForm" onSubmit={this.handleSubmit}  >
            
            <label htmlFor="types">Choose a type:</label>
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

            <label htmlFor="quantity">Amount:</label>
            <input type="number" min="1" id="quantity" placeholder="15" name="quantity" onChange={this.handleChange}></input>
            <input type="submit" value="Submit"></input>
          </form>
        </fieldset>
        <div className="pokemonContainer" onClick={this.alertModal}>
          {
            this.state.pokemonsList.map((pokemon) => {
              return (           
                <div className="boxContainer" key={pokemon.id} >
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
        <Modal className={ this.handleModalClassName() } onClose={ this.closeModal }/>
      </div>
    );
  }
}

export default App;
