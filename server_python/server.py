from os import getenv
from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
import mysql.connector
from datetime import date

app = FastAPI()

class User(BaseModel):
    nom: str
    prenom: str
    email: str
    dateNaissance: date
    ville: str
    codePostal: str

db_config = {
    'user': getenv('MYSQL_USER'),
    'password': getenv('MYSQL_ROOT_PASSWORD'),
    'host': getenv('MYSQL_HOST'),
    'database': getenv('MYSQL_DATABASE')
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.get("/utilisateurs")
def read_utilisateurs():
    conn = get_db_connection()
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM utilisateurs")
        utilisateurs = cursor.fetchall()
        return utilisateurs
    finally:
        cursor.close()
        conn.close()

@app.get("/utilisateurs/{user_id}")
def read_user(user_id: int):
    conn = get_db_connection()
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM utilisateurs WHERE _id = %s", (user_id,))
        user = cursor.fetchone()
        if user:
            return user
        raise HTTPException(status_code=404, detail="User not found")
    finally:
        cursor.close()
        conn.close()

@app.post("/utilisateurs")
def create_user(user: User):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO utilisateurs (nom, prenom, email, dateNaissance, ville, codePostal) VALUES (%s, %s, %s, %s, %s, %s)",
                       (user.nom, user.prenom, user.email, user.dateNaissance, user.ville, user.codePostal))
        conn.commit()
        return {"_id": cursor.lastrowid, **user.dict()}
    finally:
        cursor.close()
        conn.close()

@app.delete("/utilisateurs/{user_id}")
def delete_user(user_id: int):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM utilisateurs WHERE _id = %s", (user_id,))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "L'utilisateur a bien été supprimé"}
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
