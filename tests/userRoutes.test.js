const request = require('supertest');
const app = require('../server'); // Adjust the path to your actual server file
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path to your User model

beforeAll(async () => {
  const url = process.env.MONGO_URI;  // Set your MongoDB URI in the environment variables
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  it('GET /utilisateurs - success', async () => {
    const response = await request(app).get('/utilisateurs');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /utilisateurs - success', async () => {
    const response = await request(app).post('/utilisateurs').send({
      nom: "Doe",
      prenom: "John",
      email: "johndoe@example.com",
      dateNaissance: new Date(),
      ville: "Sophia Antipolis",
      codePostal: "12345"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe("johndoe@example.com");
  });

    it('GET /utilisateurs/:user_id - success', async () => {
        const user = await User.findOne({ email: "johndoe@example.com"});
        const response = await request(app).get(`/utilisateurs/${user._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe("johndoe@example.com");
    });

});
