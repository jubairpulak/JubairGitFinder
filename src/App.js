import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";

import Alert from "./components/layout/Alert";
import User from "./components/users/User";
import GitHubState from "./context/github/GIthubState";
import AlertState from "./context/alert/AlertState";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/pages/Home"
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound"

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	// const [users, setUsers] = useState([])
	// const [loading, setLoading] = useState(false)

	// const [alert, setAlert] = useState(null)

	// useEffect(async() => {
	//       setLoading(true)

	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	setUsers(res.data)
	// 	setLoading(false)
	// }, []);

	//get a single GIthub user

	//get Users repos

	return (
		<GitHubState>
					<ToastContainer />

			<AlertState>
				<Router>
					<div className="App">
						<Navbar />
						<div className="container">
							<Alert />
							<Switch>
								<Route exact path="/about" component={About} />

								<Route
									exact
									path="/user/:login"
									component={User}
								/>
								<Route
									exact
									path="/"
									component={Home}
								/>
								<Route component={NotFound}/>
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GitHubState>
	);
};

export default App;
