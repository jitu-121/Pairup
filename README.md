# 🚀 PairUp

**PairUp** is a backend-powered platform that helps developers find compatible partners for hackathons based on shared interests and skills.

---

## 📌 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Deployment:** AWS  

---

## ✨ Features

- 🔐 Secure user authentication and authorization (JWT-based)  
- 🤝 Intelligent pairing system based on user interests and skills  
- 📦 RESTful APIs for user management and pairing workflows  
- 🧩 Flexible and scalable NoSQL database design  
- ☁️ Cloud deployment ensuring high availability and performance  

---

## 🏗️ Architecture Overview

The backend is built using a modular and scalable architecture:

- **Routes:** Handle API endpoints  
- **Controllers:** Manage request-response logic  
- **Models:** Define database schemas  
- **Middleware:** Authentication, error handling  

---

## 🔑 Authentication

- JWT-based authentication system  
- Secure route protection  
- Token validation for authorized access  

---

## 📡 API Endpoints (Sample)

| Method | Endpoint         | Description              |
|--------|----------------|--------------------------|
| POST   | /api/auth      | Register/Login user      |
| GET    | /api/users     | Get user data            |
| POST   | /api/pair      | Create pairing request   |
| GET    | /api/pair      | Fetch matches            |

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jitu-121/Pairup.git
   cd Pairup


Install dependencies:

npm install

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the server:

npm start
☁️ Deployment

The backend is deployed on AWS for:

Scalability
Reliability
High performance

🎯 Future Improvements
Real-time matching (WebSockets)
Advanced recommendation algorithm
Frontend integration
User chat system
🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

📬 Contact

If you have any questions or suggestions, feel free to reach out!
