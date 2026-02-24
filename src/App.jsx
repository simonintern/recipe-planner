import { Routes, Route, useLocation } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import NewRecipeForm from './pages/NewRecipeForm'
import CookingMode from './pages/CookingMode'
import RecipeDetail from './pages/RecipeDetail'

export default function App() {
  const location = useLocation()
  const isCooking = location.pathname.startsWith('/cook/')

  if (isCooking) {
    return (
      <Routes>
        <Route path="/cook/:recipeId" element={<CookingMode />} />
        <Route path="/cook/:recipeId/:stepIndex" element={<CookingMode />} />
      </Routes>
    )
  }

  if (location.pathname.startsWith('/recipe/')) {
    return (
      <Routes>
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
      <Route path="/new-recipe" element={<NewRecipeForm />} />
    </Routes>
  )
}
