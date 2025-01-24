import React, { useState } from 'react';
import supabase from '../../supabase';

const Signup = () => {
  // States for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Signup using Supabase
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Handle success
      alert('Signup successful! Please check your email for confirmation.');
    } catch (error) {
      // Handle error
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
        
        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      
      <p style={styles.footer}>
        Already have an account? <a href="/signin" style={styles.link}>Login</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  }
};

export default Signup;
