(this["webpackJsonppokemon-app"]=this["webpackJsonppokemon-app"]||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var o=n(0),c=n(1),i=n(3),s=n.n(i),a=(n(13),n(4)),r=n(5),h=n(7),l=n(6),p=(n(14),function(t){Object(h.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(a.a)(this,n);for(var o=arguments.length,c=new Array(o),i=0;i<o;i++)c[i]=arguments[i];return(t=e.call.apply(e,[this].concat(c))).state={pokemonsList:[],limit:10,typesList:[],type:"all"},t.handleChange=function(e){var n=e.target.name,o=e.target.value,c=t.state.limit,i=t.state.type;"types"===n?i=o:c=Number(o),t.setState({limit:c,type:i})},t.handleSubmit=function(e){e.preventDefault(),"all"!==t.state.type&&t.state.limit>0?t.fetchPokemonsByType():t.fetchPokemons()},t.fetchPokemons=function(){var e=t.state.limit;fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=".concat(e)).then((function(t){return t.json()})).then((function(e){t.fetchApokemon(e.results)}))},t.fetchApokemon=function(e){var n=e.map((function(t){return fetch(t.url).then((function(t){return t.json()})).then((function(t){return t})).catch((function(t){return console.log(t)}))}));Promise.all(n).then((function(e){t.setState({pokemonsList:e})}))},t.fetchPokemonTypes=function(){fetch("https://pokeapi.co/api/v2/type/").then((function(t){return t.json()})).then((function(e){var n=e.results;t.setState({typesList:n})})).catch((function(t){return console.log(t)}))},t.fetchPokemonsByType=function(){var e=t.state.type;fetch("https://pokeapi.co/api/v2/type/".concat(e)).then((function(t){return t.json()})).then((function(e){var n=t.state.limit,o=e.pokemon.slice(0,n).map((function(t){return t.pokemon}));t.fetchApokemon(o)})).catch((function(t){return console.log(t)}))},t}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.fetchPokemonTypes(),this.fetchPokemons()}},{key:"render",value:function(){return Object(o.jsxs)("div",{className:"wrapper",children:[Object(o.jsx)("h1",{children:"Kanto Pokemon"}),Object(o.jsx)("div",{children:Object(o.jsxs)("form",{className:"searchForm",onSubmit:this.handleSubmit,children:[Object(o.jsx)("label",{htmlFor:"types",children:"Choose a type:"}),Object(o.jsxs)("select",{name:"types",id:"types",onChange:this.handleChange,children:[Object(o.jsx)("option",{value:"all",children:" all"}),this.state.typesList.map((function(t,e){return Object(o.jsx)("option",{value:"".concat(t.name),children:t.name},e)}))]}),Object(o.jsx)("label",{htmlFor:"quantity",children:"Amount:"}),Object(o.jsx)("input",{type:"number",min:"1",id:"quantity",placeholder:"15",name:"quantity",onChange:this.handleChange}),Object(o.jsx)("input",{type:"submit",value:"Submit"})]})}),Object(o.jsx)("div",{className:"pokemonContainer",children:this.state.pokemonsList.map((function(t){return Object(o.jsxs)("div",{className:"boxContainer",children:[Object(o.jsx)("img",{src:"https://pokeres.bastionbot.org/images/pokemon/".concat(t.id,".png"),alt:"this is ".concat(t.name,"the pokemon")}),Object(o.jsxs)("div",{className:"textDescription",children:[Object(o.jsx)("h2",{children:t.name}),Object(o.jsxs)("p",{children:["#",t.id]}),t.types.map((function(t){return Object(o.jsx)("ul",{children:Object(o.jsx)("li",{children:t.type.name})},t.slot)}))]})]},t.id)}))})]})}}]),n}(c.Component)),u=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(e){var n=e.getCLS,o=e.getFID,c=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),o(t),c(t),i(t),s(t)}))};s.a.render(Object(o.jsx)(p,{}),document.getElementById("root")),u()}},[[15,1,2]]]);
//# sourceMappingURL=main.bd76a401.chunk.js.map