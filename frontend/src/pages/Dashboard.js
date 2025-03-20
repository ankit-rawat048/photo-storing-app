import React, { useEffect, useState } from "react";
import "../styles/Style.css"; // Ensure this file exists for styling

const Dashboard = () => {
    const [photos, setPhotos] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/upload")
            .then(response => response.json())
            .then(data => setPhotos(data))
            .catch(error => setError("Failed to load images!"));
    }, []);

    const uploadImage = async () => {
        if (!image) {
            setError("Please select an image!");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newImage = await response.json();
                setPhotos([...photos, newImage.image]);
                setImage(null);
            } else {
                setError("Upload failed! Please try again.");
            }
        } catch (err) {
            setError("An error occurred while uploading.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Photo Dashboard</h1>

            <div className="upload-section">
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    className="file-input"
                />
                <button onClick={uploadImage} className="upload-button" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="photo-grid">
                {photos.map((photo, index) => (
                    <img 
                        key={index} 
                        src={`data:image/png;base64,${photo.imageUrl}`} 
                        alt="User Upload" 
                        className="photo-item"
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
