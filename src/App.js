// import logo from './logo.svg';
import './App.css';
import {Home} from "./Home";
import {Book} from "./Book";
import {Review} from "./Review";
import {Navigation} from "./Navigation";
import {About} from "./About";

import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/About" component={About}/>
      <Route path="/Books" component={Book}/>
      <Route path="/Reviews" component={Review} exact />
    </Switch>
  </BrowserRouter>

    
  );
}

export default App;
