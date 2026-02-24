import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const recipes = {
  '1': {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: ['1 lb spaghetti', '6 oz pancetta', '4 eggs', '1 cup pecorino Romano', 'Black pepper'],
    steps: [
      { order: 1, instruction: 'Bring a large pot of salted water to boil' },
      { order: 2, instruction: 'Cook spaghetti according to package directions' },
      { order: 3, instruction: 'Meanwhile, cook pancetta in a large skillet until crispy' },
      { order: 4, instruction: 'Beat eggs with cheese and pepper' },
      { order: 5, instruction: 'Drain pasta, add to pancetta, remove from heat, add egg mixture and toss' }
    ]
  },
  '2': {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy vegetable chicken stir fry',
    prepTime: 20,
    cookTime: 15,
    servings: 3,
    ingredients: ['1 lb chicken breast', '2 cups mixed vegetables', '3 tbsp soy sauce', '1 tbsp sesame oil', 'Garlic', 'Ginger'],
    steps: [
      { order: 1, instruction: 'Cut chicken into bite-sized pieces' },
      { order: 2, instruction: 'Heat oil in a wok over high heat' },
      { order: 3, instruction: 'Stir fry chicken until golden, remove' },
      { order: 4, instruction: 'Stir fry vegetables with garlic and ginger' },
      { order: 5, instruction: 'Return chicken, add sauce, toss and serve' }
    ]
  },
  '3': {
    id: '3',
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta and olives',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    ingredients: ['4 tomatoes', '1 cucumber', '1 red onion', '1/2 cup kalamata olives', '4 oz feta cheese', 'Olive oil', 'Oregano'],
    steps: [
      { order: 1, instruction: 'Chop tomatoes and cucumber into chunks' },
      { order: 2, instruction: 'Slice red onion thinly' },
      { order: 3, instruction: 'Combine vegetables in a bowl' },
      { order: 4, instruction: 'Add olives and crumbled feta' },
      { order: 5, instruction: 'Drizzle with olive oil, sprinkle oregano, toss and serve' }
    ]
  }
}

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = recipes[id]

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        await navigator.wakeLock?.request('screen')
      } catch (e) {}
    }
    requestWakeLock()
  }, [])

  if (!recipe) {
    return (
      <div className="recipe-detail">
        <Link to="/" className="back-link"><i className="fas fa-arrow-left"></i> Back</Link>
        <div className="empty-state">
          <h3>Recipe not found</h3>
        </div>
      </div>
    )
  }

  const totalSteps = recipe.steps.length

  return (
    <div className="app">
      <div className="recipe-detail">
        <Link to="/" className="back-link"><i className="fas fa-arrow-left"></i> Back</Link>

        <div className="recipe-detail-image">
          <i className="fas fa-utensils" style={{ fontSize: '5rem', color: 'white' }}></i>
        </div>

        <div className="recipe-detail-header">
          <h2>{recipe.title}</h2>
          <p style={{ color: 'var(--text-light)' }}>{recipe.description}</p>
        </div>

        <div className="recipe-detail-meta">
          <span><i className="fas fa-clock"></i> {recipe.prepTime}m prep</span>
          <span><i className="fas fa-fire"></i> {recipe.cookTime}m cook</span>
          <span><i className="fas fa-users"></i> {recipe.servings}</span>
        </div>

        <button className="btn btn-primary" onClick={() => navigate(`/cook/${recipe.id}`)} style={{ width: '100%', marginBottom: '1.5rem' }}>
          <i className="fas fa-play"></i> Start Cooking
        </button>

        <div className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h3>Instructions</h3>
          <ol className="step-list">
            {recipe.steps.map((step) => (
              <li key={step.order}>
                <span className="step-num">{step.order}</span>
                <span>{step.instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
