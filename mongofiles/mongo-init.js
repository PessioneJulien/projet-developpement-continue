db = db.getSiblingDB('mydb');

db.createCollection('utilisateurs', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nom", "prenom", "email", "dateNaissance", "ville", "codePostal"],
      properties: {
        nom: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        prenom: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\..+$",
          description: "must be a valid email address and is required"
        },
        dateNaissance: {
          bsonType: "date",
          description: "must be a date"
        },
        ville: {
          bsonType: "string",
          description: "must be a string"
        },
        codePostal: {
          bsonType: "string",
          description: "must be a string",
          minLength: 5,
          maxLength: 5
        },
      }
    }
  }
});

db.utilisateurs.insert({
  nom: "Doe",
  prenom: "John",
  email: "dufh@af.com",
  dateNaissance: new Date("1990-01-01"),
  ville: "Paris",
  codePostal: "75000"
});