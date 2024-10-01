import PlayGround from './PlayGround'
import ThemeProivder from './PlayGround/ThemeContext'

function App() {
  return (
    <ThemeProivder>
      <PlayGround></PlayGround>
    </ThemeProivder>
  )
}

export default App
