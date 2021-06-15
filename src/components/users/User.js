import React, { useState, useEffect, useContext } from "react";
import Spinner from "../layout/Snipper";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repo from "./../repos/Repo";
import GitHubContext from "../../context/github/githubContext";
const User = ({ match }) => {
	const githubcontext = useContext(GitHubContext);
	const { user, loading, repos, getUserRepos, getUser } = githubcontext;

	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
		company,
	} = user;
	//useEffect

	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);

		//eslint-disable-next-line
	}, []);

	if (loading) return <Spinner />;
	return (
		<div>
			<Link to="/" className="btn btn-light">
				Back To Search
			</Link>
			Hireable :{" "}
			{hireable ? (
				<i className="fas fa-check text-success" />
			) : (
				<i className="fas fa-times-circle text-danger" />
			)}
			<div className="card grid-2">
				<div className="all-center">
					<img
						src={avatar_url}
						alt=""
						className="round-img"
						style={{ width: "150px" }}
					/>
					<h1>{name}</h1>
					<p>Location : {location}</p>
				</div>
				<div>
					{bio && (
						<>
							<h3>Bio</h3>
							<p>{bio}</p>
						</>
					)}
					<a href={html_url} className="btn btn-dark my-1">
						Visit Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<>
									<strong>User Name : </strong> {login}
								</>
							)}
						</li>
						<li>
							{company && (
								<>
									<strong>Company Name : </strong> {company}
								</>
							)}
						</li>
						<li>
							{blog && (
								<>
									<strong>Website : </strong> {blog}
								</>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">
					Followers : {followers}
				</div>
				<div className="badge badge-success">
					Following : {following}
				</div>
				<div className="badge badge-light">
					Public Repos : {public_repos}
				</div>
				<div className="badge badge-dark">
					Public Gists : {public_gists}
				</div>
			</div>
			<h3>Recent reposities :</h3>
			<Repo repos={repos}></Repo>
		</div>
	);
};

export default User;
