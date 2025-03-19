import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
        console.log("User Info:", { email, password });
    };

    return (
        <div className="container">
            <form onSubmit={loginUser} className="signup-form">
                <h2 className="form-title">Sign In</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />

                <button type="submit" className="submit-button">Submit</button>
                
                <p>
                    You are new here? <Link to="/signup" className="link">Register here</Link>.
                </p>
            </form>
        </div>
    );
}

export default SignIn;
