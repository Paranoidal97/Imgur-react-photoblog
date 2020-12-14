import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

/* Auth0 */

import AuthNav from './AuthenticatedRoute'
import SecretRoute from "./components/secretRoute"

/* Pages */

import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import Album from "./pages/Album"

/* Admin */

import AlbumList from './admin/albumList'
import EditAlbum from './admin/editAlbum'

/* Static files */

import Navbar from "./components/navbar"
import Footer from "./components/footer"





function App() {
  return (
    <Router>
        <div>
           <Navbar/>
           <Switch>
           <Route exact path="/" component={Home}/>
           <Route exact path="/Login" component={AuthNav}/>
           <Route exact path="/About" component={About}/>
           <Route exact path="/Contact" component={Contact}/>
           <Route path="/album/:id" >
                    <Album />
            </Route>
            <SecretRoute path="/admin" component={AlbumList} />   
            <SecretRoute path="/albumedit/:id" component={EditAlbum} />
           </Switch>
           <Footer/>
        </div>
    </Router>
  );
}

export default App;
