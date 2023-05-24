require('dotenv').config();

const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('./app');

describe('API Test', () => {
    const token = 'Bearer ' + jwt.sign({ username: 'admin@permit-blog.app' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const writer = 'Bearer ' + jwt.sign({ username: 'writer@permit-blog.app' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const approvedWriter = 'Bearer ' + jwt.sign({ username: 'approved_writer@permit-blog.app' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const commenter = 'Bearer ' + jwt.sign({ username: 'commenter@permit-blog.app' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    test('CRUD Post', async () => {
        await request(app).get('/post').expect(200);
        await request(app).get('/post/1').expect(200);
        await request(app).post('/post').expect(401);
        await request(app).put('/post/1').expect(401);
        await request(app).delete('/post/1').expect(401);


        await request(app).post('/post').set('Authorization', token).expect(200);
        await request(app).put('/post/1').set('Authorization', token).expect(200);
        await request(app).delete('/post/1').set('Authorization', token).expect(200);
    });

    test('CRUD Author', async () => {
        await request(app).get('/author').expect(200);
        await request(app).get('/author/1').expect(200);
        await request(app).post('/author').expect(401);
        await request(app).put('/author/1').expect(401);
        await request(app).delete('/author/1').expect(401);

        await request(app).post('/author').set('Authorization', token).expect(200);
        await request(app).put('/author/1').set('Authorization', token).expect(200);
        await request(app).delete('/author/1').set('Authorization', token).expect(200);
    });

    test('CRUD Comment', async () => {
        await request(app).get('/comment').expect(200);
        await request(app).get('/comment/1').expect(200);
        await request(app).post('/comment').expect(401);
        await request(app).put('/comment/1').expect(401);
        await request(app).delete('/comment/1').expect(401);

        await request(app).post('/comment').set('Authorization', token).expect(200);
        await request(app).put('/comment/1').set('Authorization', token).expect(200);
        await request(app).delete('/comment/1').set('Authorization', token).expect(200);
    });
});
