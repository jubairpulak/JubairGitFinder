import React, { useReducer } from "react";
import axios from "axios";

import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_USERS,
	GET_REPOS,
} from "../types";

let githubClinetID;
let githubClientSecret;
// REACT_APP_GITHUB_CLIENT_ID=2fec06916ce35cc12f8c
// REACT_APP_GITHUB_CLIENT_SECRET =dd2433a98a2aec90c740a85da3a20f0d3a7cc92c
if (process.env.NODE_ENV !== "production") {
	githubClinetID = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClinetID = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GitHubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//search users
	const searchUsers = async (text) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClinetID}&client_secret=${githubClientSecret}`
		);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};
	//get users

	const getUser = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${githubClinetID}&client_secret=${githubClientSecret}`
		);
		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};
	//get repos
	const getUserRepos = async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClinetID}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	//clear users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	//set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GitHubState;
