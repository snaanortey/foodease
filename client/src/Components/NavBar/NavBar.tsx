import React from 'react';
import {Link} from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <details className="details">
    <summary className="summary"></summary>
    <nav className="menu">
      <Link to="/">Home</Link>
      <Link to="/getRecipes">Get Recipes</Link>
      <Link to="/getShoppingList">Get Shopping List</Link>
    </nav>
  </details>
  )
}
