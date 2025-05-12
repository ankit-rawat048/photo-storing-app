import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [photos, setPhotos] = useState([]); // Ensure it's always an array
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const token = localStorage.getItem("token"); // Get user token for API calls

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch("https://photo-storing-app-1.onrender.com/api/upload", {
                    headers: {
                        "Authorization": `Bearer ${token}`, // 🔥 Send user token
                    },
                });
                const data = await response.json();
                console.log("Fetched Data:", data);

                if (Array.isArray(data)) {
                    setPhotos(data); // ✅ Only set if it's an array
                } else {
                    console.error("Unexpected API response:", data);
                    setPhotos([]);
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
                setError("Failed to load images!");
                setPhotos([]); // Prevent crash
            }
        };

        fetchPhotos();
    }, [token]); // Re-fetch when token changes

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
                headers: {
                    "Authorization": `Bearer ${token}`, // 🔥 Send user token
                },
                body: formData,
            });

            if (response.ok) {
                const newImage = await response.json();
                setPhotos((prevPhotos) => [...prevPhotos, newImage.image]); // ✅ Fix state update
                setImage(null);
            } else {
                setError("Upload failed! Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setError("An error occurred while uploading.");
        } finally {
            setLoading(false);
        }
    };

    const deletePhoto = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/upload/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, // 🔥 Ensure user is authorized
                },
            });

            if (response.ok) {
                setPhotos((prevPhotos) => prevPhotos.filter(photo => photo._id !== id));
                setModalOpen(false);
            } else {
                setError("Failed to delete image!");
            }
        } catch (error) {
            console.error("Delete error:", error);
            setError("An error occurred while deleting.");
        }
    };

    return (
        <div className="dashboard-container">
            <header>
                <nav>
                    <ul>
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><Link to={'/howto'}>How To</Link></li>
                        <li><Link to={'/logout'}>Logout</Link></li>
                    </ul>
                </nav>
            </header>

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
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <img 
                            key={photo._id} 
                            src={`data:image/png;base64,${photo.imageUrl}`} 
                            alt="User Upload" 
                            className="photo-item"
                            onClick={() => {
                                setSelectedPhoto(photo);
                                setModalOpen(true);
                            }}
                        />
                    ))
                ) : (
                    <p>No photos available.</p>
                )}
            </div>

            {modalOpen && selectedPhoto && (
                <div className="modal">
                    <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                    <img className="modal-content" src={`data:image/png;base64,${selectedPhoto.imageUrl}`} alt="Larger view" />
                    <button className="delete-button" onClick={() => deletePhoto(selectedPhoto._id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
