import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const recipes = {
  '1': {
    id: '1',
    title: 'Spaghetti Carbonara',
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

export default function CookingMode() {
  const { recipeId, stepIndex } = useParams()
  const navigate = useNavigate()
  const recipe = recipes[recipeId]
  
  const [currentStep, setCurrentStep] = useState(stepIndex ? parseInt(stepIndex) - 1 : 0)
  const [completedSteps, setCompletedSteps] = useState([])

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
      <div className="cooking-mode">
        <div className="cooking-content">
          <h2>Recipe not found</h2>
          <Link to="/" className="btn btn-primary">Go back</Link>
        </div>
      </div>
    )
  }

  const totalSteps = recipe.steps.length
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  const goToNextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (!isLastStep) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      navigate(`/cook/${recipeId}/${nextStep + 1}`, { replace: true })
    }
  }

  const goToPrevStep = () => {
    if (!isFirstStep) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      navigate(`/cook/${recipeId}/${prevStep + 1}`, { replace: true })
    }
  }

  const finishCooking = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    alert('Cooking completed! 🎉')
    navigate('/')
  }

  return (
    <div className="cooking-mode">
      <div className="cooking-header">
        <Link to={`/recipe/${recipeId}`} className="btn btn-secondary"><i className="fas fa-arrow-left"></i></Link>
        <h3>{recipe.title}</h3>
        <div style={{ width: 40 }}></div>
      </div>

      <div className="cooking-content">
        <div className="step-progress">
          {recipe.steps.map((_, index) => (
            <div 
              key={index}
              className={`step-dot ${
                completedSteps.includes(index) ? 'completed' : 
                index === currentStep ? 'current' : ''
              }`}
            />
          ))}
        </div>

        <div className="current-step">
          <div className="step-number">Step {currentStep + 1} of {totalSteps}</div>
          <div className="step-instruction">
            {recipe.steps[currentStep].instruction}
          </div>
          
          <div className="cooking-nav">
            <button 
              className="btn btn-secondary" 
              onClick={goToPrevStep}
              disabled={isFirstStep}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {isLastStep ? (
              <button className="btn btn-primary" onClick={finishCooking}>
                <i className="fas fa-check"></i> Done
              </button>
            ) : (
              <button className="btn btn-primary" onClick={goToNextStep}>
                Next <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
