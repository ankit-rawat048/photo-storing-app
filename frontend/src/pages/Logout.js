import { Link, useNavigate } from "react-router-dom";
import "../styles/Logout.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Clear authentication data
        localStorage.removeItem("token"); // Remove JWT token (if using one)
        sessionStorage.clear(); // Clear session data

        try {
            // Call backend logout API (if needed)
            await fetch("https://photo-storing-app-1.onrender.com/api/auth/logout", {
                method: "POST", // Change to GET if needed
                headers: { "Content-Type": "application/json" },
            });

            // Redirect to Sign In after logout
            navigate("/signIn");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="logout-container">
            <button className="backbutton"><Link to={'/dashboard'}>Back</Link></button>
            <h2>Are you sure you want to log out?</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
