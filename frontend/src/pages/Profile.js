import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import LatestImgs from "./UserImgs/LatestImg";
import FavoriteImgs from "./UserImgs/FavriouteImg";

const Profile = () => {
    return (
        <div>
            {/* User Profile Info */}
            <div>
                <img
                    src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                    width={200}
                    height={200}
                    alt="profile img"
                    style={{ borderRadius: "50%" }}
                />

                <h1>Name of User</h1>

                <div style={{ display: "flex", gap: "20px" }}>
                    <p>Total images: 300</p>
                    <p>Favorite images: 25</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "15px" }}>
                    <li>
                        <Link to="/latestimgs">Latest Images</Link>
                    </li>
                    <li>
                        <Link to="/favoriteimgs">Favorite Images</Link>
                    </li>
                </ul>
            </nav>

            {/* Define Routes */}
            <Routes>
                <Route path="/latestimgs" element={<LatestImgs />} />
                <Route path="/favoriteimgs" element={<FavoriteImgs />} />
            </Routes>
        </div>
    );
}

export default Profile;
