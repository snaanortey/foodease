import React from "react";
import veggies from "../../assets/icons/veggies_icon.png";
import clock from "../../assets/icons/clock.png";
import { Recipes } from "../../types";

interface RecipeSummaryProps {
  recipe: Recipes;
}

export default function RecipesSummary(props: RecipeSummaryProps) {
  return (
    <div className="recipeSummary">
      <div className="recipeSummary__card">
        <div className="recipeSummary__image">
          <img
            className="recipeSummary__image-image"
            src={props.recipe.imageUrl}
            alt="recipe"
          />
        </div>
        <div className="recipeSummary__description">
          <h5 className="recipeSummary__title"> {props.recipe.title} </h5>
          <div className="recipeSummary__details">
            <div className="recipeSummary__details-div">
              <img
                className="recipeSummary__details-image"
                src={veggies}
                alt="veggies"
              />
              <p>veggie</p>
            </div>
            <div className="recipeSummary__details-div">
              <img
                className="recipeSummary__details-image"
                src={clock}
                alt="clock"
              />
              <p>30 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
