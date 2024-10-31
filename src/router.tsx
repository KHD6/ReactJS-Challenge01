import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/coins";
import Coin from "./routes/coin";

interface IDarkMode {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setIsDarkMode: any;
}

function Router({ isDarkMode, toggleDarkMode, setIsDarkMode}: IDarkMode) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ReactJS-Challenge01/:coinId">
          <Coin isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} setIsDarkMode={setIsDarkMode}/>
        </Route>
        <Route path="/ReactJS-Challenge01/">
          <Coins isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} setIsDarkMode={setIsDarkMode}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
