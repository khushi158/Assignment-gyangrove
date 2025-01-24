import React, { useState } from 'react';
import supabase from '../../supabase';

import {useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Sign in using Supabase
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message); // Display error
    } else {
      // Redirect user after successful sign in
      console.log('Logged in successfully', data);
      // You can also use React Router to redirect, like:
      navigate('/home');
    }
    
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Sign In</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button type="submit" style={styles.submitButton}>Sign In</button>
        </form>
        <p style={styles.footer}>Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fa',
  },
  formContainer: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  error: {
    color: '#ff4d4f',
    fontSize: '14px',
    marginBottom: '15px',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  footer: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default SignIn;
