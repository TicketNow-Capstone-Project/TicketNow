# 🚗 TicketNow – QR Code Generator & Scanner for Drivers

TicketNow is a simple web app that lets you generate QR codes with driver and vehicle information, and scan those QR codes using your webcam or image files. Perfect for delivery check-ins, transport terminals, or quick access logs.

---

## 🌟 Features

✅ **QR Code Generator**  
Enter details like name, plate number, and destination — and get a downloadable QR code.

✅ **QR Code Scanner**  
Use your webcam or upload a QR image to scan. The scanned info is shown instantly and added to a log.

✅ **Queue / Log System**  
Every scan is saved in a queue, which you can review later.

---

## 📸 How It Works

### 1. Generate QR Code

Go to the main form and fill in:

- First Name  
- Middle Name (optional)  
- Last Name  
- Address  
- Vehicle Type  
- Plate Number  
- Route Taken  

Click **Generate QR**.

Your QR code appears and you can **download it as an image**.

---

### 2. Scan QR Code

Use your **device camera** or **upload a QR image**.

- The data from the QR will show on screen.  
- It is also saved to the system’s internal **queue**.

---

### 3. View Queue

Check previously scanned entries via the **Queue** or **Log** page.

---

## 🚀 Getting Started

### 🔧 Requirements

- Python 3.8+  
- Django 5.2.4  
- pip

---

### 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ticketnow.git
cd ticketnow

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply database migrations
python manage.py migrate

# 5. Run the server
python manage.py runserver
```
Visit http://127.0.0.1:8000/ to use the app.
```
📁 Project Structure
php
Copy
Edit
ticketnow/
├── qr_site/           # Main Django project settings
├── qrapp/             # App with views, models, and forms
│   ├── static/        # QR image storage
│   ├── templates/     # HTML templates (form, scanner, queue)
├── db.sqlite3         # Database
├── manage.py          # Django entry point
└── README.md          # This file
```

## 💡 How It Works (Quick Peek)

- **Form Input** → Saved in DB → Generates QR with that info  
- **QR Code** → Saved as image + shown inline + downloadable  
- **Scanner** → Uses `html5-qrcode` JavaScript to read codes  
- **Queue** → Stores every successful scan in the backend  

---

## 🧪 Upcoming Features (Ideas)

- QR scan history download  
- Admin panel to manage entries  
- Export queue to CSV  
- Login for security  

---

## 👨‍💻 Contributing

We welcome contributions! Here's how you can help:

- Improve the UI  
- Add export options (CSV, PDF)  
- Add user authentication  
- Improve scan error handling  
- Help write tests  


## 📄 License
This project is licensed under the `MIT License`.

## 🙌 Credits
Built using:
* `Django`
* `html5-qrcode`

