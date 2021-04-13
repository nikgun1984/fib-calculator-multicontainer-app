import "./App.css";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="App-header">
					<NavLink to="/">Homepage</NavLink>
					<NavLink to="/otherpage">Other Page</NavLink>
				</header>
				<Route exact path="/" component={Fib}></Route>
				<Route exact path="/otherpage" component={OtherPage}></Route>
			</div>
		</BrowserRouter>
	);
}

export default App;
