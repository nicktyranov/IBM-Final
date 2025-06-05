/* jshint esversion: 8 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
	const [gifts, setGifts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = urlConfig.backendUrl + '/api/gifts';
				const req = await fetch(url);
				if (!req.ok) {
					throw new Error('Could not fetch data from the server: ' + req.status);
				}
				let data = await req.json();
				if (data) {
					setGifts(data);
				}
			} catch (error) {
				console.log('Fetch error: ' + error.message);
			}
		};

		fetchData();
	}, []);

	const goToDetailsPage = (productId) => {
		try {
			let url = `/app/product/${productId}`;
			navigate(url);
		} catch (error) {
			console.log('Navigate error: ' + error.message);
		}
	};

	const formatDate = (timestamp) => {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(new Date(timestamp * 1000));
	};

	const getConditionClass = (condition) => {
		return condition === 'New' ? 'list-group-item-success' : 'list-group-item-warning';
	};

	return (
		<div className="container mt-5">
			<div className="row">
				{gifts.map((gift, index) => (
					<div key={gift.id} className="col-md-4 mb-4">
						<div className="card product-card">
							<div className="image-placeholder">
								{gift.image ? (
									<img
										src={gift.image}
										alt={gift.name}
										className="card-img-top"
										loading={index === 0 ? 'eager' : 'lazy'}
									/>
								) : (
									<div className="no-image-available">No Image Available</div>
								)}
							</div>
							<div className="card-body">
								<h5 className="card-title">{gift.name}</h5>
								<p className={`card-text ${getConditionClass(gift.condition)}`}>{gift.condition}</p>
								<p className="card-text">{formatDate(gift.date_added)}</p>
								<button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
									View Details
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default MainPage;
