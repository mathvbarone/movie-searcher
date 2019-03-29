import React from 'react';
import './footer.css';

const Footer = () => {
	return (
		<section className="main-footer">
			<strong className="made-by">
				Made by
				<a
					className="footer-link"
					href="https://www.matheusbarone.com/en/"
					rel="noopener"
					target="_blank"
					title="Website | Matheus Barone"
				>
					Matheus Barone
				</a>
			</strong>
			<a
				className="math-github"
				href="https://github.com/mathvbarone/"
				rel="noopener"
				target="_blank"
				title="Github | Marvel Hero Searcher"
			>
				<i className="fab fa-github" />
			</a>
		</section>
	);
};

export default Footer;
