import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function NewRecipeForm() {
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: '',
    steps: ''
  })

  const handleSave = () => {
    if (!recipe.title) return
    // In real app, save to backend
    alert('Recipe saved!')
    navigate('/')
  }

  return (
    <div className="app">
      <div className="recipe-form-page">
        <Link to="/" className="back-link"><i className="fas fa-arrow-left"></i> Back</Link>
        <h2>New Recipe</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Recipe title"
            value={recipe.title}
            onChange={e => setRecipe({...recipe, title: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Prep Time (minutes)</label>
          <input
            type="number"
            placeholder="0"
            value={recipe.prepTime}
            onChange={e => setRecipe({...recipe, prepTime: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Cook Time (minutes)</label>
          <input
            type="number"
            placeholder="0"
            value={recipe.cookTime}
            onChange={e => setRecipe({...recipe, cookTime: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Servings</label>
          <input
            type="number"
            placeholder="4"
            value={recipe.servings}
            onChange={e => setRecipe({...recipe, servings: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Ingredients (one per line)</label>
          <textarea
            placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup sugar"
            value={recipe.ingredients}
            onChange={e => setRecipe({...recipe, ingredients: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Instructions (one step per line)</label>
          <textarea
            placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
            value={recipe.steps}
            onChange={e => setRecipe({...recipe, steps: e.target.value})}
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  )
}
