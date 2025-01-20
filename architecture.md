# **DO I NEED A DOCTOR Architecture**

## **1. Web Architecture**
The web architecture for the application follows a classic **3-tier architecture**:

### **1.1 Presentation Layer (Frontend)**
- **Purpose**: Provides the user interface for interaction.
- **Technologies**: HTML, CSS, Bootstrap (responsive design).
- **Communication**: Sends user inputs to the backend through HTTP requests.

### **1.2 Application Layer (Backend)**
- **Purpose**: Processes requests, manages sessions, applies business logic, interacts with the database, and integrates AI functionality.
- **Technologies**: Flask (Python), REST APIs for communication.
- **Features**: User authentication, symptom triage, and analytics.

### **1.3 Data Layer (Database)**
- **Purpose**: Stores user data, application data, and logs.
- **Technologies**: PostgreSQL for structured data storage.

---

## **2. Database Design**
Here’s a draft schema based on the application features:

| **Table Name**    | **Fields**                                | **Purpose**                                                                 |
|--------------------|-------------------------------------------|-----------------------------------------------------------------------------|
| **users**          | id, name, email, hashed_password, locale | Stores user account information, including language preferences.            |
| **sessions**       | id, user_id, session_data, expiry        | Manages user sessions for authentication.                                   |
| **symptoms**       | id, user_id, symptoms, diagnosis, date   | Tracks user-reported symptoms and AI-generated diagnosis.                   |
| **analytics**      | id, region, doctor, pathology, frequency | Stores aggregated data for insights (pathologies, user locations, etc.).    |

### **Relational Design**
- A **one-to-many relationship** between `users` and `symptoms`.
- Analytics data is derived from symptoms and triaged information.

---

## **3. Features to Create**

### **3.1 Authentication System**
- Secure user registration and login.
- Password hashing with **bcrypt**.
- Session management using Flask sessions.

### **3.2 Symptom Triage System**
- AI-based diagnosis using ChatGPT API.
- Multi-language support (English, French, Arabic).
- User-friendly symptom reporting form.

### **3.3 Analytics Dashboard**
- Insights on pathologies by region, city, and frequency.
- Accessible by admins/health professionals.

### **3.4 Internationalization (i18n)**
- UI and communication in three languages.
- Dynamic locale detection based on user preferences.

### **3.5 Data Protection**
- Secure storage and handling of user data (e.g., GDPR compliance).
- Encrypt sensitive information.

---

## **4. Technologies Used**

### **4.1 Backend**
- Flask (Python framework)
- SQLAlchemy (ORM)
- Flask-Babel (for i18n)
- Flask-WTF (for form handling)
- Bcrypt (password hashing)

### **4.2 Frontend**
- HTML, CSS, Bootstrap (responsive design).

### **4.3 Database**
- PostgreSQL/MySQL (relational database).

### **4.4 AI Integration**
- ChatGPT API (for symptom triage).

### **4.5 Deployment**
- Docker (containerization).
- Heroku (cloud platform).

### **4.6 DevOps/CI-CD**
- GitHub Actions (automated testing and deployment).

---

## **Next Steps**
The first development phase focuses on **User Authentication**:
- Backend setup → Database integration → Testing → Frontend integration.

Ready to dive into step-by-step development!
