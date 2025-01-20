import Home from "./components/home";
import { Routes, Route } from "react-router-dom"

const App = () => {

  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
    </Routes>
  );
};

export default App;