import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

function CharacterCard({ character }) {
    return (
        <div className="character-card card">
            <img src={character.image} className="card-img-top" alt={character.name} />
            <div className="card-body text-center">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">Status: {character.status}</p>
                <p className="card-text">Last Location: {character.location.name}</p>
            </div>
        </div>
    );
}

function App() {
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch characters from API
    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = (query = '') => {
        setLoading(true);
        axios
            .get(`https://rickandmortyapi.com/api/character`, {
                params: { name: query },
            })
            .then((response) => {
                setCharacters(response.data.results.slice(0, 10)); // Limit to 10 characters
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching characters:', error);
                setCharacters([]);
                setLoading(false);
            });
    };

    // Handle search input
    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetchCharacters(e.target.value);
    };

    return (
        <div className="app container">
            <h1 className="text-center my-4">Rick & Morty Characters</h1>
            <input
                type="text"
                placeholder="Search characters..."
                value={search}
                onChange={handleSearch}
                className="form-control mb-4 search-input"
            />
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="character-grid row">
                    {characters.map((character) => (
                        <div key={character.id} className="col-sm-5 col-md-3 col-md-2 col-lg-2 mb-xl-1">
                            <CharacterCard character={character} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;

