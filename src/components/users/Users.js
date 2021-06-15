import React, { Component, useContext } from "react";
import UserItem from "./UserItem";
import Snipper from "../layout/Snipper";
import GitHubContext from "../../context/github/githubContext";
const Users = () => {
	const githubContext = useContext(GitHubContext);
	const { users, loading } = githubContext;
	if (loading) {
		return <Snipper />;
	} else {
		return (
			<div style={userStyle}>
				{users.map((user, key) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
};

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: "1rem",
};

export default Users;
