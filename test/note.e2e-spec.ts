import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';

describe('Notes API (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    jwtToken = jwtService.sign({
      sub: 'testuserid',
      email: 'test@example.com',
      role: 'admin',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/notes should create a note', () => {
    return request(app.getHttpServer())
      .post('/api/notes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Test Note', content: 'Hello World' })
      .expect(201)
      .then((res) => {
        expect(res.body.title).toBe('Test Note');
        expect(res.body.content).toBe('Hello World');
      });
  });

  it('GET /api/notes should return notes', () => {
    return request(app.getHttpServer())
      .get('/api/notes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.notes)).toBe(true);
      });
  });

  it('PUT /api/notes/:id should update a note', async () => {
    
    const note = await request(app.getHttpServer())
      .post('/api/notes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Old Title', content: 'Old content' });

    return request(app.getHttpServer())
      .put(`/api/notes/${note.body._id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated Title' })
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe('Updated Title');
      });
  });

  it('DELETE /api/notes/:id should delete a note (admin only)', async () => {
    const note = await request(app.getHttpServer())
      .post('/api/notes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Delete Note', content: 'Delete me' });

    return request(app.getHttpServer())
      .delete(`/api/notes/${note.body._id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE /api/notes/:id → should fail for non-admin', async () => {
    // Create a non-admin token
    const userToken = jwtService.sign({
      sub: 'testuserid',
      email: 'test@example.com',
      role: 'user',
    });

    const note = await request(app.getHttpServer())
      .post('/api/notes')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Non-admin Delete', content: 'Fail test' });

    return request(app.getHttpServer())
      .delete(`/api/notes/${note.body._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403); // Forbidden
  });
});
