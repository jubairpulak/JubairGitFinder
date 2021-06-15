"use strict";
import React, { useState, useContext } from "react";
import GitHubContext from "../../context/github/githubContext";
import AlertContext from "./../../context/alert/alertContext";
const Search = () => {
	const githubContext = useContext(GitHubContext);
	const alertContext = useContext(AlertContext);
	const [text, setText] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === "") {
			alertContext.setAlert("Please enter something", "error");
		} else {
			githubContext.searchUsers(text);
			setText("");
		}
	};

	// console.log(this.state.text);

	const onChange = (e) => setText(e.target.value);

	return (
		<div>
			<form onSubmit={onSubmit} className="form">
				<input
					type="text"
					name="text"
					placeholder="search users...."
					value={text}
					onChange={onChange}
				/>
				<input
					type="submit"
					value="Search"
					className="btn btn-dark btn-block"
				/>
			</form>
			{githubContext.users.length > 0 && (
				<button
					className="btn btn-light btn-block"
					onClick={githubContext.clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;