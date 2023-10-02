import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/home"
import Todolist from "./pages/todolist";
import NotFound from "./pages/notFound";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="*" element={ <NotFound/> } />
        <Route path="/" element={ <Home/> }/>
        <Route path="/todos" element={ <Todolist/> }/>
      </Routes>
    </Router>
  );
};

export default App;