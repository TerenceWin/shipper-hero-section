import './App.css'
import HeroSection from './components/HeroSection'

function App() {

  return (
    <div id="hero" className="hero">
      <div id="heroContainer" className="heroContainer">
        <h1 className="sentence1">Build apps by chatting to AI</h1>
        <h1 className="sentence2">Chat it into existence</h1>
        <div id="loginButtosDiv" className="loginButtonsDiv"> 
          <button className="resetButtons heroButtons getStartedButton">Get Starteed</button>
          <button className="resetButtons heroButtons loginButton">Login</button>
        </div>
        <HeroSection /> 
      </div>
    </div>
  )
}

export default App
