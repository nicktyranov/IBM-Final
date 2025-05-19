import React, { useState } from 'react';

import './RegisterPage.css';

function RegisterPage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = () => {
		console.log('clicked Register');
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-4">
					<div className="register-card p-4 border rounded">
						<h2 className="text-center mb-4 font-weight-bold">Register</h2>
						<label htmlFor="firstName" className="form label">
							First Name:
						</label>
						<input
							type="text"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Enter your first name"
						/>

						<label htmlFor="lastName" className="form label">
							Last Name:
						</label>
						<input
							type="text"
							name="lastName"
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Enter your last name"
						/>

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
						<button className="btn btn-primary w-100 mb-3" onClick={() => handleRegister()}>
							Register
						</button>
						<p className="mt-4 text-center">
							Already a member?{' '}
							<a href="/app/login" className="text-primary">
								Login
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	); //end of return
}

export default RegisterPage;
