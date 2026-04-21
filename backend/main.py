from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import hashlib
import bcrypt
from datetime import datetime, timedelta
from jose import jwt

# SECRET_KEY is used to sign the "ID Card" so no one can forge it.
# Keep this a secret!
SECRET_KEY = "SUPER_SECRET_REALLY_LONG_RANDOM_STRING_HERE"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 # User stays logged in for 1 hour

app = FastAPI()

# Enable CORS so your React app can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change this to your Vercel URL later
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password Hashing Setup


class User(BaseModel):
    email: str
    password: str

# Simple SQLite initialization
def init_db():
    conn = sqlite3.connect("users.db")
    conn.execute("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT)")
    conn.close()

init_db()

def get_password_hash(password: str) -> str:
    # 1. SHA-256 pre-hash: Converts any length password into a 64-char hex string
    # This prevents the 72-character truncation in bcrypt
    sha256_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
    
    # 2. Bcrypt: Uses the SHA-256 hex string as the input
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(sha256_hash.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 1. Re-hash the incoming plain password with SHA-256
    sha256_hash = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
    
    # 2. Check the SHA-256 hex against the stored bcrypt hash
    return bcrypt.checkpw(
        sha256_hash.encode('utf-8'), 
        hashed_password.encode('utf-8')
    )

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.get("/")
async def root():
    return {"status": "Online", "message": "Shop Backend is running!"}

@app.post("/register")
async def register(user: User):
    # Use our new infinite-length helper
    hashed_password = get_password_hash(user.password)
    
    try:
        conn = sqlite3.connect("users.db")
        conn.execute("INSERT INTO users (email, password) VALUES (?, ?)", (user.email, hashed_password))
        conn.commit()
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")
    finally:
        conn.close()

@app.post("/login")
async def login(user: User):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    
    # 1. Find the user in the DB
    cursor.execute("SELECT password FROM users WHERE email = ?", (user.email,))
    result = cursor.fetchone()
    conn.close()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    db_hashed_password = result[0]

    # 2. Use our SHA-256 + Bcrypt helper to verify
    if not verify_password(user.password, db_hashed_password):
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    # 3. Create the "Digital ID Card"
    access_token = create_access_token(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)