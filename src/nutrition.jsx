import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    userSearch: "",
    recipes: [],
  };

  handleChange(e) {
    this.setState({
      userSearch: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    Axios.get(
      `https://api.edamam.com/search?q=${this.state.userSearch}&app_id=c2f8a963&app_key=50a9c5d1f171508f80243bee7cd4734c`
    ).then((response) => {
      console.log(response.data.hits);
      this.setState({ recipes: response.data.hits });
    }, this.showRecipes);
  }
  showRecipes() {
    return this.state.recipes.map((recipe) => {
      return (
        <ul>
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <li>Name of the dish: {recipe.recipe.label}</li>
          <li>Number of Calories: {recipe.recipe.calories}</li>
          Link to Recipe: <a href={recipe.recipe.url}>{recipe.recipe.url} </a>
        </ul>
      );
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <form
          onSubmit={(e) => {
            this.onSubmit(e);
          }}
        >
          <input type="text" onChange={(e) => this.handleChange(e)} />
        </form>
        {this.showRecipes()}
      </div>
    );
  }
}

export default App;
