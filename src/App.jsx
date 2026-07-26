import Header from './sections/header';
import Stats from './sections/stats';
import Parts from './sections/parts';
import './app.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Stats />
      <Parts />
    </div>
  );
}

export default App;