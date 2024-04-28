from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server_python.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

client = TestClient(app)

def test_read_utilisateurs():
    response = client.get("/utilisateurs")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_user():
    user_data = {
        "nom": "Doe",
        "prenom": "Jane",
        "email": "janedoe@example.com",
        "dateNaissance": "2000-01-01",
        "ville": "Sophia antipolis",
        "codePostal": "54321"
    }
    response = client.post("/utilisateurs", json=user_data)
    assert response.status_code == 200
    assert response.json()['email'] == "janedoe@example.com"

# Add more tests as needed
