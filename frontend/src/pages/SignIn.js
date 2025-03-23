import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Signin.css';

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
            <div className="signin-form">
                {/* Left Section */}
                <div className="left-section">
                    <h1>Welcome to Website</h1>
                    <p> where you can upload your photos securely</p>
                </div>

                {/* Right Section */}
                <div className="right-section">
                    <form onSubmit={loginUser}>
                        <h2 className="form-title">User Login</h2>

                        {error && <p className="error-message">{error}</p>}

                        <input
                            type="email"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />

                        <div className="remember-container">
                            <label>
                                <p> create a new one</p>
                            </label>
                            <p className="link"><Link to={'/signUp'}>Sign up?</Link></p>
                        </div>

                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? "Signing In..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
