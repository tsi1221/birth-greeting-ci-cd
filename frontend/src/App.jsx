import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    month: "",
    image: null,
  });
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      const res = await axios.post("http://localhost:5000/api/greet", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error fetching greeting");
    }
  };

  return (
    <div className="app">
      {/* Overlay animations */}
      <div className="overlay">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="balloon" style={{ "--i": Math.random() }}></div>
        ))}
        <div className="cake">🎂</div>
        <div className="candles">🕯️🕯️🕯️🕯️🕯️</div>
      </div>

      <h1 className="title">🎉 Birthday Surprise 🎉</h1>

      {/* Greeting Form */}
      <form onSubmit={handleSubmit} className="greet-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="gender" placeholder="Gender" onChange={handleChange} required />
        <input name="age" placeholder="Age" type="number" onChange={handleChange} required />
        <input name="month" placeholder="Birth Month" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Send Surprise</button>
      </form>

      {/* Preview uploaded image with crown */}
      {preview && (
        <div className="preview-container">
          <div className="image-wrapper">
            <img className="preview-image" src={preview} alt="Preview" />
            <div className="crown">👑</div>
          </div>
        </div>
      )}

      {/* Greeting Result with side-by-side layout */}
      {result && (
        <div className="greeting-container">
          <div className="greeting-text">
            <h2>{result.greeting}</h2>
            <p className="quote">{result.quote}</p>
            <p className="birthday">{result.birthday}</p>
          </div>
          <div className="greeting-music">
            <iframe
              width="400"
              height="225"
              src={result.music}
              title="Music Player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
