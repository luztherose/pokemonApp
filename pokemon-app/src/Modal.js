import { Component } from "react";

class Modal extends Component {
  render() {
    // Destructuring props
    const { className, onClose, pokemon, pokeClicked } = this.props;
    return (
      <div>
        <div className={className} id="myModal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div>
              <ul className="pokeDetails">
                <h1>Hi, I'm {pokemon.name}! 😊</h1>
                <h2>Description:</h2>
                <li>
                  <strong>Height:</strong> {pokemon.height}
                </li>
                <li>
                  <strong>Weight:</strong> {pokemon.weight}
                </li>
                <h2>Abilities:</h2>
                {pokeClicked
                  ? pokemon.abilities.map((pokeAbility, index) => {
                      return <li key={index}>{pokeAbility.ability.name}</li>;
                    })
                  : ""}
                <h2>Moves:</h2>
                <div className="pokemonMovesContainer">
                  {pokeClicked
                    ? pokemon.moves.map((pokeMoves, index) => {
                        return <li key={index}>{pokeMoves.move.name}</li>;
                      })
                    : ""}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
