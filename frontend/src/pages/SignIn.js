import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Style.css"; // Ensure this file exists and contains styles

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setError(data.message || "Invalid email or password!");
            }
        } catch (err) {
            setError("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={loginUser} className="signin-form">
                <h2 className="form-title">Sign In</h2>

                {error && <p className="error-message">{error}</p>}

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="redirect-text">
                    Don't have an account? <span onClick={() => navigate("/signup")} className="link">Sign up here</span>.
                </p>
            </form>
        </div>
    );
};

export default SignIn;
