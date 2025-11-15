const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 5000;

// -------------------------------
// Middleware
// -------------------------------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Multer for handling uploaded image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// -------------------------------
// Helper Data
// -------------------------------

// 40+ God Quotes
const quotes = [
  "God is always good!",
  "Trust in the Lord with all your heart.",
  "His mercies are new every morning.",
  "The Lord is my shepherd; I shall not want.",
  "Commit your way to the Lord; trust in Him.",
  "God's plans are perfect.",
  "He makes all things beautiful in His time.",
  "The joy of the Lord is your strength.",
  "Fear not, for I am with you.",
  "God never fails.",
  "Blessed is the one who trusts in the Lord.",
  "He will never leave you nor forsake you.",
  "With God all things are possible.",
  "The Lord is my light and salvation.",
  "Cast all your anxieties on Him.",
  "Be strong and courageous; God is with you.",
  "Delight yourself in the Lord.",
  "God is my refuge and strength.",
  "Pray without ceasing.",
  "Love never fails because God is love.",
  "Let your light shine before men.",
  "God works all things for good.",
  "The Lord is faithful to all His promises.",
  "Seek first the Kingdom of God.",
  "Rejoice in hope, be patient in tribulation.",
  "Do not be anxious about anything.",
  "God’s grace is sufficient for you.",
  "Blessed are the pure in heart.",
  "The Lord lifts up the humble.",
  "Be still and know that He is God.",
  "Walk in love as Christ loved us.",
  "The Lord your God is mighty.",
  "Cast your cares upon Him.",
  "God is our strength and shield.",
  "His word is a lamp to your feet.",
  "Fear the Lord and turn from evil.",
  "The steadfast love of the Lord never ceases.",
  "Trust Him in all your ways.",
  "God’s timing is always perfect."
];

// Birthday messages
const birthdays = [
  "Happy Birthday! 🎉",
  "Many blessings on your special day! 🎂",
  "May your day be filled with joy and love!",
  "Wishing you a day full of laughter and happiness!",
  "Celebrate your life and the amazing person you are!"
];

// 10+ YouTube Music links
const musicTracks = [
  "https://www.youtube.com/embed/5u4xTa3LR2U",
  "https://www.youtube.com/embed/egVAW6l_QU8",
  "https://www.youtube.com/embed/_z-1fTlSDF0",
  "https://www.youtube.com/embed/WmBs0SQ6Gi0",
  "https://www.youtube.com/embed/n6M8ELkdPOM",
  "https://www.youtube.com/embed/wxhipvT4u60",
  "https://www.youtube.com/embed/bdqj0T6F5HU",
  "https://www.youtube.com/embed/k9uW2lktXyE",
  "https://www.youtube.com/embed/QaR31V5xBQ8",
  "https://www.youtube.com/embed/18fCw0CtyqQ"
];

// -------------------------------
// Routes
// -------------------------------
app.post("/api/greet", upload.single("image"), (req, res) => {
  const { name, gender, age, month } = req.body;
  const image = req.file; // optional

  if (!name || !gender || !age || !month) {
    return res.status(400).json({ error: "Please provide name, gender, age, and month." });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomBirthday = birthdays[Math.floor(Math.random() * birthdays.length)];
  const randomMusic = musicTracks[Math.floor(Math.random() * musicTracks.length)];

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.json({
    greeting: `Hello ${name}! 🎈`,
    quote: randomQuote,
    birthday: randomBirthday,
    music: randomMusic,
    image: image ? `data:${image.mimetype};base64,${image.buffer.toString("base64")}` : null
  });
});

// -------------------------------
// Start Server
// -------------------------------
app.listen(PORT, () => {
  console.log(`🎂 Backend running on port ${PORT} 🎂`);
});
