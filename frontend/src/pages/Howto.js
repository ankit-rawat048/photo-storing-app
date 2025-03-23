import React from "react";
import "../styles/Howto.css";
import { Link } from "react-router-dom";

const HowTo = () => {
  return (
    
    <div className="how-to-container">
      <h1>How to Use This Website</h1>
      <p>Welcome to our photo storage and management platform! Follow the steps below to understand its features and how to use it effectively.</p>

      <section className="feature-section">
        <h2>🔹 Features</h2>
        <ul>
          <li>Secure user authentication (Sign In / Sign Up)</li>
          <li>Upload and store photos</li>
          <li>View all uploaded images in a grid layout</li>
          <li>Click on images to see a larger view</li>
          <li>Delete unwanted photos easily</li>
          <li>Responsive and user-friendly interface</li>
        </ul>
      </section>

      <section className="steps-section">
        <h2>📌 How to Use</h2>
        <ol>
          <li><strong>Sign Up:</strong> If you are a new user, go to the <Link to="/signUp">Sign Up</Link> page and create an account.</li>
          <li><strong>Sign In:</strong> Already have an account? Go to <Link to="/signIn">Sign In</Link> and log in.</li>
          <li><strong>Upload Photos:</strong> Once logged in, visit the <Link to="/dashboard">Dashboard</Link> and upload images using the file input.</li>
          <li><strong>View Images:</strong> Your uploaded images will be displayed in a grid layout.</li>
          <li><strong>Click to Enlarge:</strong> Click on any image to view a larger version.</li>
          <li><strong>Delete Photos:</strong> Inside the enlarged view, click the "Delete" button to remove unwanted photos.</li>
          <li><strong>Logout:</strong> When you're done, click on <Link to="/logout">Logout</Link> to securely sign out.</li>
        </ol>
      </section>

      <button className="backbutton"><Link to={'/dashboard'}>Back</Link></button>

    </div>
  );
};

export default HowTo;
