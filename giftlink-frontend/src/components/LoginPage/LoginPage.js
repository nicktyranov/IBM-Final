import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { setIsLoggedIn } = useAppContext();
	const navigate = useNavigate();
	const bearerToken = sessionStorage.getItem('bearer-token');

	useEffect(() => {
		if (sessionStorage.getItem('auth-token')) {
			navigate('/app');
		}
	}, [navigate]);

	if (error) {
		return <div className="alert alert-danger">{error}</div>;
	}

	const handleLogin = async () => {
		console.log(`Email: ${email}`);
		console.log(`Password: ${password}`);
		try {
			const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					Authorization: bearerToken ? `Bearer ${bearerToken}` : ''
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error ${response.status}: ${errorText}`);
			}

			const json = await response.json();

			if (json.authtoken) {
				sessionStorage.setItem('auth-token', json.authtoken);
				sessionStorage.setItem('name', json.userName);
				sessionStorage.setItem('email', json.userEmail);
				setIsLoggedIn(true);
				navigate('/app');
			} else {
				document.getElementById('email').value = '';
				document.getElementById('password').value = '';
				setError('Wrong password. Try again.');
				setTimeout(() => {
					setError('');
				}, 2000);
			}
		} catch (e) {
			console.log('Error fetching details: ' + e.message);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-4">
					<div className="login-card p-4 border rounded">
						<h2 className="text-center mb-4 font-weight-bold">Login</h2>
						<span
							style={{
								color: 'red',
								height: '.5cm',
								display: 'block',
								fontStyle: 'italic',
								fontSize: '12px'
							}}
						>
							{error}
						</span>
						<label htmlFor="email" className="form label">
							Email:
						</label>
						<input
							type="text"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
						/>

						<label htmlFor="password" className="form label">
							Password:
						</label>
						<input
							type="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
						/>

						<button className="btn btn-primary w-100 mb-3" onClick={() => handleLogin()}>
							Login
						</button>

						<p className="mt-4 text-center">
							New here?{' '}
							<a href="/app/register" className="text-primary">
								Register Here
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
