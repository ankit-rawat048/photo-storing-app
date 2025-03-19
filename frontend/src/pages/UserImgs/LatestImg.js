import React, { useEffect, useState } from "react";

const LatestImgs = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://pixabay.com/api/?key=48104836-7b7897cbf9a1a7b6381b92465&q=mountains&image_type=photo')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                return response.json();
            })
            .then(data => {
                setPhotos(data.hits); // Pixabay stores images in "hits" array
                setLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Mountain Images</h1>

            {/* Show Loading Indicator */}
            {loading && <p>Loading images...</p>}

            {/* Show Error Message */}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {/* Display Images */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {photos.map((photo) => (
                    <img key={photo.id} src={photo.webformatURL} alt={photo.tags} width="200" height="150" />
                ))}
            </div>
        </div>
    );
};

export default LatestImgs;
