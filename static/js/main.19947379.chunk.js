(this["webpackJsonppokemon-app"]=this["webpackJsonppokemon-app"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n(1),i=n(3),a=n.n(i),s=(n(13),n(4)),r=n(5),h=n(7),u=n(6),l=(n(14),function(e){Object(h.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(s.a)(this,n);for(var c=arguments.length,o=new Array(c),i=0;i<c;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={pokemonsList:[],limit:10},e.handleChange=function(t){var n=t.target.value;e.setState({limit:Number(n)})},e.handleSubmit=function(t){t.preventDefault(),e.fetchPokemon()},e.fetchPokemon=function(){var t=e.state.limit;fetch("https://pokeapi.co/api/v2/pokemon?offset=".concat(t,"&limit=").concat(t)).then((function(e){return e.json()})).then((function(t){var n=t.results.map((function(e){return fetch(e.url).then((function(e){return e.json()})).then((function(e){return e}))}));Promise.all(n).then((function(t){console.log("7"),e.setState({pokemonsList:t})})).catch((function(e){return console.log("Error in promises ".concat(e))}))}))},e}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.fetchPokemon()}},{key:"render",value:function(){return Object(c.jsxs)("div",{className:"wrapper",children:[Object(c.jsx)("h1",{children:"Kanto Pokemon"}),Object(c.jsx)("div",{children:Object(c.jsxs)("form",{className:"searchForm",onSubmit:this.handleSubmit,children:[Object(c.jsx)("label",{htmlFor:"gsearch",children:"Search by name:"}),Object(c.jsx)("input",{type:"search",id:"psearch",name:"psearch"}),Object(c.jsx)("label",{htmlFor:"gsearch",children:"Amount:"}),Object(c.jsx)("input",{type:"number",min:"1",id:"quantity",name:"quantity",onChange:this.handleChange}),Object(c.jsx)("input",{type:"submit",value:"Submit"})]})}),Object(c.jsx)("div",{className:"pokemonContainer",children:this.state.pokemonsList.map((function(e){return Object(c.jsxs)("div",{className:"boxContainer",children:[Object(c.jsx)("img",{src:"https://pokeres.bastionbot.org/images/pokemon/".concat(e.id,".png"),alt:"this is ".concat(e.name,"the pokemon")}),Object(c.jsxs)("div",{className:"textDescription",children:[Object(c.jsx)("h2",{children:e.name}),Object(c.jsxs)("p",{children:["#",e.id]}),e.types.map((function(e){return Object(c.jsx)("ul",{children:Object(c.jsx)("li",{children:e.type.name})},e.slot)}))]})]},e.id)}))})]})}}]),n}(o.Component)),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),i(e),a(e)}))};a.a.render(Object(c.jsx)(l,{}),document.getElementById("root")),m()}},[[15,1,2]]]);
//# sourceMappingURL=main.19947379.chunk.js.map