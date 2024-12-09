import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function CharacterCard({ character, onClick }) {
    return (
        <div
            className="character-card card border rounded shadow-sm"
            onClick={() => onClick(character)}
            style={{ cursor: 'pointer' }}
        >
            <img src={character.image} className="card-img-top rounded-top" alt={character.name} />
            <div className="card-body text-center">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                    <strong>Last Location:</strong> {character.location.name}
                </p>
                <span
                    className={`badge ${
                        character.status === 'Alive'
                            ? 'bg-success'
                            : character.status === 'Dead'
                                ? 'bg-danger'
                                : 'bg-secondary'
                    }`}
                >
                    {character.status}
                </span>
            </div>
        </div>
    );
}

function CharacterDetails({ character, onClose }) {
    return (
        <div className="character-details-container">
            <div className="character-details text-center p-4">
                <h2 className="mb-3">{character.name}</h2>
                <img
                    src={character.image}
                    alt={character.name}
                    className="img-fluid rounded mb-3 imgg"
                    style={{ maxWidth: '300px' }}
                />
                <p className={`status ${character.status.toLowerCase()} mb-3`}>
                    {character.status}
                </p>
                <div className="detailss">
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Location:</strong> {character.location.name}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                <p><strong>Species:</strong> {character.species}</p>
                </div>
                <button className="btn btn-secondary mt-3" onClick={onClose}>
                    Back
                </button>
            </div>
        </div>
    );
}

function App() {
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

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

    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetchCharacters(e.target.value);
    };

    return (
        <div className="app container mt-4">
            {selectedCharacter ? (
                <CharacterDetails
                    character={selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                />
            ) : (
                <>
                    <h1 className="text-center mb-4">Rick & Morty Characters</h1>
                    <div className="mb-4 d-flex justify-content-center">
                        <input
                            type="text"
                            placeholder="Search for characters"
                            value={search}
                            onChange={handleSearch}
                            className="form-control me-2"
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        <div className="character-grid row g-4">
                            {characters.map((character) => (
                                <div
                                    key={character.id}
                                    className="col-12 col-sm-5 col-md-3 col-lg-2"
                                >
                                    <CharacterCard
                                        character={character}
                                        onClick={setSelectedCharacter}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
