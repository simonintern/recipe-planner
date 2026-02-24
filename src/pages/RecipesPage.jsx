import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock data - will connect to backend later
const initialRecipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    source: 'italianrecipes.com',
    ingredients: ['1 lb spaghetti', '6 oz pancetta', '4 eggs', '1 cup pecorino Romano', 'Black pepper'],
    steps: [
      { order: 1, instruction: 'Bring a large pot of salted water to boil' },
      { order: 2, instruction: 'Cook spaghetti according to package directions' },
      { order: 3, instruction: 'Meanwhile, cook pancetta in a large skillet until crispy' },
      { order: 4, instruction: 'Beat eggs with cheese and pepper' },
      { order: 5, instruction: 'Drain pasta, add to pancetta, remove from heat, add egg mixture and toss' }
    ]
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy vegetable chicken stir fry',
    prepTime: 20,
    cookTime: 15,
    servings: 3,
    source: 'asiancuisine.com',
    ingredients: ['1 lb chicken breast', '2 cups mixed vegetables', '3 tbsp soy sauce', '1 tbsp sesame oil', 'Garlic', 'Ginger'],
    steps: [
      { order: 1, instruction: 'Cut chicken into bite-sized pieces' },
      { order: 2, instruction: 'Heat oil in a wok over high heat' },
      { order: 3, instruction: 'Stir fry chicken until golden, remove' },
      { order: 4, instruction: 'Stir fry vegetables with garlic and ginger' },
      { order: 5, instruction: 'Return chicken, add sauce, toss and serve' }
    ]
  },
  {
    id: '3',
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta and olives',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    source: 'mediterraneanrecipes.com',
    ingredients: ['4 tomatoes', '1 cucumber', '1 red onion', '1/2 cup kalamata olives', '4 oz feta cheese', 'Olive oil', 'Oregano'],
    steps: [
      { order: 1, instruction: 'Chop tomatoes and cucumber into chunks' },
      { order: 2, instruction: 'Slice red onion thinly' },
      { order: 3, instruction: 'Combine vegetables in a bowl' },
      { order: 4, instruction: 'Add olives and crumbled feta' },
      { order: 5, instruction: 'Drizzle with olive oil, sprinkle oregano, toss and serve' }
    ]
  }
]

export default function RecipesPage() {
  const [recipes] = useState(initialRecipes)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRecipeUrl, setNewRecipeUrl] = useState('')

  const handleAddRecipe = () => {
    // TODO: Connect to scraper API
    alert('This will call the recipe-scraper API to import: ' + newRecipeUrl)
    setShowAddModal(false)
    setNewRecipeUrl('')
  }

  return (
    <div>
      <div className="page-header">
        <h2>My Recipes</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Recipe
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="empty-state">
          <h3>No recipes yet</h3>
          <p>Add your first recipe to get started!</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <div className="recipe-card-image">
                🍳
              </div>
              <div className="recipe-card-content">
                <h3>{recipe.title}</h3>
                <div className="recipe-card-meta">
                  <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>👥 {recipe.servings} servings</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Add Recipe from URL</h3>
            <input
              type="url"
              placeholder="Paste recipe URL here..."
              value={newRecipeUrl}
              onChange={e => setNewRecipeUrl(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddRecipe}>
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
