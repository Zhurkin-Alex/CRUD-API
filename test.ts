import request from 'supertest';
import app from './src/server';

describe('API Tests', () => {
  let server: any;
  let userId: string;

  beforeAll(async () => {
    // Start the server
    server = app.listen(process.env.PORT || 5000);

    // Create a new user for testing
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Alex',
        age: 25,
        hobbies: ['reading', 'gaming'],
      });
    userId = res.body.id;
  });

  afterAll((done) => {
    // Close the server
    server.close(() => {
      done();
    });
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      {
        id: userId,
        username: 'Alex',
        age: 25,
        hobbies: ['reading', 'gaming'],
      },
    ]);
  });

  it('should get a specific user', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: userId,
      username: 'Alex',
      age: 25,
      hobbies: ['reading', 'gaming'],
    });
  });

  it('should return 404 for a non-existing user', async () => {
    const res = await request(app).get('/api/users/non-existing');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'Alex Zhurkin',
        age: 30,
        hobbies: ['traveling'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'Alex Zhurkin',
      age: 30,
      hobbies: ['traveling'],
    });
  });

  it('should return 400 if required fields are missing during user creation', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        age: 30,
        hobbies: ['traveling'],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Username and age are required' });
  });

  it('should update an existing user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        username: 'Alex Zhurkin',
        age: 26,
        hobbies: ['reading', 'gaming', 'coding'],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: userId,
      username: 'Alex Zhurkin',
      age: 26,
      hobbies: ['reading', 'gaming', 'coding'],
    });
  });

  it('should return 400 if required fields are missing during user update', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        age: 26,
        hobbies: ['reading', 'gaming', 'coding'],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Username and age are required' });
  });

  it('should return 404 for updating a non-existing user', async () => {
    const res = await request(app)
      .put('/api/users/non-existing')
      .send({
        username: 'Alex Zhurkin',
        age: 26,
        hobbies: ['reading', 'gaming', 'coding'],
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });

  it('should delete an existing user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 for deleting a non-existing user', async () => {
    const res = await request(app).delete('/api/users/non-existing');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
});
