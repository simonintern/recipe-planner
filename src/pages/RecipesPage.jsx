import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialRecipes = [
  { id: '1', title: 'Spaghetti Carbonara', prepTime: 15, cookTime: 20 },
  { id: '2', title: 'Chicken Stir Fry', prepTime: 20, cookTime: 15 },
  { id: '3', title: 'Greek Salad', prepTime: 15, cookTime: 0 }
]

const getWeekDays = () => {
  const today = new Date()
  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push({
      date,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate()
    })
  }
  return days
}

export default function RecipesPage() {
  const [recipes] = useState(initialRecipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDay, setSelectedDay] = useState(0)
  const weekDays = getWeekDays()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.startsWith('http')) {
      alert('Would scrape recipe from: ' + searchQuery)
    }
  }

  return (
    <div className="app">
      {/* Search */}
      <div className="search-section">
        <form className="search-bar" onSubmit={handleSearch}>
          <i className="fas fa-search icon"></i>
          <input 
            type="text" 
            placeholder="Search or paste recipe URL..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* New Recipe Button */}
      <button className="new-recipe-btn" onClick={() => navigate('/new-recipe')}>
        <i className="fas fa-plus"></i> New Recipe
      </button>

      {/* Schedule */}
      <div className="section">
        <h3>Schedule</h3>
        <div className="schedule-days">
          {weekDays.map((d, i) => (
            <div 
              key={i} 
              className={`schedule-day ${selectedDay === i ? 'active' : ''}`}
              onClick={() => setSelectedDay(i)}
            >
              <span className="day-name">{d.dayName}</span>
              <span className="day-num">{d.dayNum}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Queue */}
      <div className="section queue-section">
        <h3>Backlog <i className="fas fa-arrow-up"></i></h3>
        <div className="queue-list">
          {recipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="queue-card"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="queue-card-image">
                <i className="fas fa-utensils"></i>
              </div>
              <div className="queue-card-content">
                <h4>{recipe.title}</h4>
                <span className="time"><i className="fas fa-clock"></i> {recipe.prepTime + recipe.cookTime}m</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <i className="fas fa-book icon"></i>
          <span>Recipes</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-calendar icon"></i>
          <span>Calendar</span>
        </div>
        <div className="nav-item">
          <i className="fas fa-shopping-cart icon"></i>
          <span>Shopping</span>
        </div>
      </nav>
    </div>
  )
}
