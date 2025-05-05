import React from 'react';
import hikingImage from '../../assets/hiking.jpg'; // Adjust the path as needed

function Hiking() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Explore the Beauty of Hiking</h1>
        <p style={styles.subtitle}>
          Reconnect with nature and challenge yourself with scenic hiking trails around the world.
        </p>
      </div>

      <div style={styles.content}>
        <img src={hikingImage} alt="Hiking Trail" style={styles.image} />

        <div style={styles.text}>
          <h2 style={styles.sectionTitle}>Why Go Hiking?</h2>
          <p>
            Hiking offers physical exercise, mental clarity, and a break from the hustle of everyday life. Whether you
            enjoy mountain peaks or forest paths, hiking lets you explore the world from a new perspective.
          </p>

          <h3 style={styles.subheading}>Top Benefits:</h3>
          <ul style={styles.list}>
            <li>Improves cardiovascular fitness</li>
            <li>Reduces stress and anxiety</li>
            <li>Boosts mood and mental health</li>
            <li>Connects you with nature</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '36px',
    color: '#2e8b57',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: '30px',
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  text: {
    flex: 1,
    minWidth: '280px',
    color: '#444',
  },
  sectionTitle: {
    color: '#2e8b57',
    marginBottom: '10px',
  },
  subheading: {
    marginTop: '20px',
    color: '#333',
  },
  list: {
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
};

export default Hiking;
