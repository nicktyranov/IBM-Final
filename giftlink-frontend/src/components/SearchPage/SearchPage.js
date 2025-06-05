// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { urlConfig } from '../../config';

// function SearchPage() {
// 	const [searchQuery, setSearchQuery] = useState('');
// 	const [ageRange, setAgeRange] = useState(7);
// 	const [searchResults, setSearchResults] = useState([]);

// 	const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
// 	const conditions = ['New', 'Like New', 'Older'];

// 	useEffect(() => {
// 		const fetchProducts = async () => {
// 			try {
// 				let url = `${urlConfig.backendUrl}/api/gifts`;
// 				console.log(url);
// 				const response = await fetch(url);
// 				if (!response.ok) {
// 					throw new Error(`HTTP error; ${response.status}`);
// 				}
// 				const data = await response.json();
// 				setSearchResults(data);
// 			} catch (error) {
// 				console.log('Fetch error: ' + error.message);
// 			}
// 		};

// 		fetchProducts();
// 	}, []);

// 	const searchResultFunction = async () => {
// 		const baseUrl = `${urlConfig.backendUrl}/api/search?`;
// 		const queryParams = new URLSearchParams({
// 			name: searchQuery,
// 			age_years: ageRange,
// 			category: document.getElementById('categorySelect').value,
// 			condition: document.getElementById('conditionSelect').value
// 		}).toString();

// 		try {
// 			const response = await fetch(`${baseUrl}${queryParams}`);
// 			if (!response.ok) {
// 				throw new Error('Search failed');
// 			}
// 			const data = await response.json();
// 			setSearchResults(data);
// 		} catch (e) {
// 			console.log('Error fetching search results:', e.message);
// 		}
// 	};

// 	const navigate = useNavigate();

// 	const goToDetailsPage = (productId) => {
// 		navigate(`${urlConfig.backendUrl}/api/gifts/${productId}`);
// 	};

// 	return (
// 		// <div className="container mt-5">
// 		<div className="search-layout">
// 			<div className="search-filters">
// 				<div className="filter-section mb-3 p-3 border rounded">
// 					<h5>Filters</h5>
// 					<div className="d-flex flex-column">
// 						<label htmlFor="categorySelect">Category</label>
// 						<select id="categorySelect" className="form-control my-1">
// 							<option value="">All</option>
// 							{categories.map((category) => (
// 								<option key={category} value={category}>
// 									{category}
// 								</option>
// 							))}
// 						</select>

// 						<label htmlFor="conditionSelect">Condition</label>
// 						<select id="conditionSelect" className="form-control my-1">
// 							<option value="">All</option>
// 							{conditions.map((condition) => (
// 								<option key={condition} value={condition}>
// 									{condition}
// 								</option>
// 							))}
// 						</select>

// 						<label htmlFor="ageRange">Less than {ageRange} years</label>
// 						<input
// 							type="range"
// 							className="form-control-range"
// 							id="ageRange"
// 							min="1"
// 							max="10"
// 							value={ageRange}
// 							onChange={(e) => setAgeRange(e.target.value)}
// 						/>
// 					</div>
// 					<input
// 						placeholder="Search"
// 						type="text"
// 						className="form-control my-2"
// 						value={searchQuery}
// 						onChange={(e) => setSearchQuery(e.currentTarget.value)}
// 					/>
// 					<button className="btn btn-primary mt-2" onClick={searchResultFunction}>
// 						Search
// 					</button>
// 				</div>
// 			</div>

// 			<div className="search-results">
// 				{searchResults.length > 0 ? (
// 					searchResults.map((product) => (
// 						<div key={product.id} className="card mb-3">
// 							{product.image ? (
// 								<img src={product.image} alt={product.name} className="card-img-top" />
// 							) : (
// 								'no img'
// 							)}
// 							<div className="card-body">
// 								<h5 className="card-title">{product.name}</h5>
// 								<p className="card-text">{product.description.slice(0, 100)}...</p>
// 							</div>
// 							<div className="card-footer">
// 								<button onClick={() => goToDetailsPage(product.id)} className="btn btn-primary">
// 									View More
// 								</button>
// 							</div>
// 						</div>
// 					))
// 				) : (
// 					<div className="alert alert-info" role="alert">
// 						No products found. Please revise your filters.
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 		// </div>
// 	);
// }

// export default SearchPage;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { urlConfig } from '../../config';

function SearchPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [ageRange, setAgeRange] = useState(7);
	const [searchResults, setSearchResults] = useState([]);

	const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
	const conditions = ['New', 'Like New', 'Older'];

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const url = `${urlConfig.backendUrl}/api/gifts`;
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`HTTP error: ${response.status}`);
				}
				const data = await response.json();
				setSearchResults(data);
			} catch (error) {
				console.log('Fetch error: ' + error.message);
			}
		};
		fetchProducts();
	}, []);

	const searchResultFunction = async () => {
		const baseUrl = `${urlConfig.backendUrl}/api/search?`;
		const queryParams = new URLSearchParams({
			name: searchQuery,
			age_years: ageRange,
			category: document.getElementById('categorySelect').value,
			condition: document.getElementById('conditionSelect').value
		}).toString();

		try {
			const response = await fetch(`${baseUrl}${queryParams}`);
			if (!response.ok) {
				throw new Error('Search failed');
			}
			const data = await response.json();
			setSearchResults(data);
		} catch (e) {
			console.log('Error fetching search results:', e.message);
		}
	};

	const goToDetailsPage = (productId) => {
		navigate(`/app/product/${productId}`);
	};

	return (
		<div className="">
			<div className="search-layout">
				<div className="search-filters">
					<div className="filter-section mb-3 p-3 border rounded">
						<h5>Filters</h5>
						<div className="d-flex flex-column">
							<label htmlFor="categorySelect">Category</label>
							<select id="categorySelect" className="form-control my-1">
								<option value="">All</option>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>

							<label htmlFor="conditionSelect">Condition</label>
							<select id="conditionSelect" className="form-control my-1">
								<option value="">All</option>
								{conditions.map((condition) => (
									<option key={condition} value={condition}>
										{condition}
									</option>
								))}
							</select>

							<label htmlFor="ageRange">Less than {ageRange} years</label>
							<input
								type="range"
								className="form-control-range"
								id="ageRange"
								min="1"
								max="10"
								value={ageRange}
								onChange={(e) => setAgeRange(e.target.value)}
							/>

							<label htmlFor="searchQuery" className="mt-3">
								Search
							</label>
							<input
								id="searchQuery"
								placeholder="Enter keyword"
								type="text"
								className="form-control mb-2"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.currentTarget.value)}
							/>
							<button className="btn btn-primary" onClick={searchResultFunction}>
								Search
							</button>
						</div>
					</div>
				</div>

				<div className="search-results">
					{searchResults.length > 0 ? (
						searchResults.map((product) => (
							<div key={product.id} className="card product-card">
								{product.image ? (
									<img src={product.image} alt={product.name} className="card-img-top" />
								) : (
									<div className="no-image-available">No image</div>
								)}
								<div className="card-body">
									<h5 className="card-title">{product.name}</h5>
									<p className="card-text">{product.description.slice(0, 100)}...</p>
								</div>
								<div className="card-footer">
									<button onClick={() => goToDetailsPage(product.id)} className="btn btn-primary w-100">
										View More
									</button>
								</div>
							</div>
						))
					) : (
						<div className="alert alert-info">No products found. Adjust your filters.</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default SearchPage;
