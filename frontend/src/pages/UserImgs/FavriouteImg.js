import React, { useEffect, useState } from "react";

const FavoriteImgs =() =>{

    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        fetch('https://pixabay.com/api/?key=48104836-7b7897cbf9a1a7b6381b92465&q=mountains&image_type=photo')
        .then(response => response.json())
        .then(data => setPhotos(data.hits)) // Pixabay stores images in "hits" array
        .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div>
            <h1>Mountain Images</h1>
            <div>
                {photos.map((photo) => (
                    <img key={photo.id} src={photo.webformatURL} alt={photo.tags} width="200" height="150" />
                ))}
            </div>
        </div>
    );
}

export default FavoriteImgs;