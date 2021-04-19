import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
//BrowserRouter as Router just means that we are importing BrowserRouter and using it wit the name Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';
import CreateBlog from './components/CreateBlog';
import NotFound from './components/NotFound';


function App() {
 

  return (
    //We need to surround the entire application with the Router component.
    //We can then use the Router in the entire application.
    //All components that are nested in the app comnponent has access to the Router
    <Router>
    <div className="App">
      <Header />
      <div className="content">
        {/* The switch component makes sure that only 1 route is shown at any time */}
        <Switch>
          {/* Set up individual routes within the switch.
          You create a route for each page by using the Route component.
          Each Route requires a path.*/}
          <Route exact path="/">
            {/* Show the content when we are at this path */}
              <Home />
          </Route>
          <Route path="/about">
              <About />
          </Route>
          <Route path="/contact">
              <Contact />
          </Route>
          {/* Route parameter */}
          <Route path="/blogs/:id">
              <BlogDetails  />
          </Route>
          <Route path="/create">
              <CreateBlog />
          </Route>
          {/* Catches any routes that do not match.
          Has to be at the bottom or it will catch right away. */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
