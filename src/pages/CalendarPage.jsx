import { useState } from 'react'
import { Link } from 'react-router-dom'

// Get current month info
const getMonthData = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDayOfWeek = firstDay.getDay()
  
  return { daysInMonth, startDayOfWeek }
}

const getWeekDays = () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Generate mock events
const generateMockEvents = () => {
  const today = new Date()
  return [
    { id: '1', recipeId: '1', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), completed: false },
    { id: '2', recipeId: '2', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), completed: false },
    { id: '3', recipeId: '3', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), completed: true }
  ]
}

const recipeTitles = {
  '1': 'Spaghetti Carbonara',
  '2': 'Chicken Stir Fry',
  '3': 'Greek Salad'
}

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [events] = useState(generateMockEvents())

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const { daysInMonth, startDayOfWeek } = getMonthData(currentYear, currentMonth)
  const weekDays = getWeekDays()

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isToday = (day) => {
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear()
  }

  const getEventsForDay = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    return events.filter(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentMonth &&
      event.date.getFullYear() === currentYear
    )
  }

  // Create calendar grid
  const days = []
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return (
    <div>
      <div className="page-header">
        <h2>Meal Calendar</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={prevMonth}>← Prev</button>
          <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button className="btn btn-secondary" onClick={nextMonth}>Next →</button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-header">{day}</div>
        ))}
        
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day && isToday(day) ? 'today' : ''}`}
          >
            {day && (
              <>
                <div className="calendar-day-number">{day}</div>
                {getEventsForDay(day).map(event => (
                  <Link 
                    to={`/recipe/${event.recipeId}`} 
                    key={event.id}
                    className={`calendar-event ${event.completed ? 'completed' : ''}`}
                  >
                    {recipeTitles[event.recipeId]}
                  </Link>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
