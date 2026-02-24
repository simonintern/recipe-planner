import { Routes, Route, Link, useLocation } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import CalendarPage from './pages/CalendarPage'
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

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Recipe Planner</h1>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Recipes</Link>
          <Link to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>Calendar</Link>
        </div>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  )
}
