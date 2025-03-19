import React, { useState } from "react";
import '../styles/Style.css';
import { Link } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const newUser = (e) => {
        e.preventDefault();
        console.log("User Info:", { name, email, password });
    };
    
    return (
        <div className="container">
            <form onSubmit={newUser} className="signup-form">
                <h2 className="form-title">Sign Up</h2>
                
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                
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
                    Already have an account? <Link to="/signin" className="link">Sign in here</Link>.
                </p>
                <Link to="/dashboard">dashboard</Link>
            </form>
        </div>
    );
};

export default SignUp;
