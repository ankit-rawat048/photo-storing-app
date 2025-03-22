import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Please sign in.");
                navigate("/signin");
            } else {
                setError(data.message || "Registration failed!");
            }
        } catch (err) {
            setError("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={registerUser} className="signup-form">
                <h2 className="form-title">Sign Up</h2>

                {error && <p className="error-message">{error}</p>}

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    required
                />

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
                    {loading ? "Registering..." : "Sign Up"}
                </button>

                <p className="redirect-text">
                    Already have an account? <span onClick={() => navigate("/signin")} className="link">Sign in here</span>.
                </p>
            </form>
        </div>
    );
};

export default SignUp;
