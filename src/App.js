import logo from './logo.svg';
import './App.css';
import Restaurant from './components/Restaurant/Restaurant';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Restaurant></Restaurant>
    </div>
  );
}

export default App;
