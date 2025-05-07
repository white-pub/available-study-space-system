// backend/tests/api.test.ts
// Integration tests for Available Study Space API mounted manually without altering core code

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import knex, { Knex } from 'knex';
import request from 'supertest';
import config from '../knexfile';
import {
  studySpaceHandlers,
  buildingHandlers,
  buildingRoomHandlers,
  occupiedSpaceLogHandlers,
  buildingHoursHandlers,
  allRoomWithBuildingInfoHandlers,
  occupiedRoomsSSEHandler,
} from '../src/study-space/handlers';

let app: express.Express;
let db: Knex;

beforeAll(async () => {
  // Configure in-memory SQLite for tests via knexfile.mock
  db = knex({
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
    migrations: { directory: path.resolve(__dirname, '../migrations') },
    seeds:      { directory: path.resolve(__dirname, '../seeds') },
  });

  // Run migrations & seed test data
  await db.migrate.latest();
  await db.seed.run();

  // Build an Express app and mount all handlers
  app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.set('db', db);

  studySpaceHandlers(app);
  buildingHandlers(app);
  buildingRoomHandlers(app);
  occupiedSpaceLogHandlers(app);
  buildingHoursHandlers(app);
  allRoomWithBuildingInfoHandlers(app);
  occupiedRoomsSSEHandler(app);
});

afterAll(async () => {
  await db.destroy();
});

describe('🔌 Available Study Space API', () => {
  it('GET /buildings → 200 + array of buildings', async () => {
    const res = await request(app).get('/buildings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach((b: any) => {
      expect(b).toHaveProperty('building_id');
      expect(b).toHaveProperty('building_name');
    });
  });

  it('404 for non-existent building', async () => {
    const res = await request(app).get('/buildings/9999');
    expect(res.status).toBe(404);
  });

  it('CRUD occupied-space-logs end-to-end', async () => {
    // Create
    const post = await request(app)
      .post('/occupied-space-logs')
      .send({ room_id: 1, occupied: true });
    expect(post.status).toBe(201);
    const logId = post.body.log_id;

    // Update
    const put = await request(app)
      .put(`/occupied-space-logs/${logId}`)
      .send({ occupied: false });
    expect(put.status).toBe(200);
    expect(put.body).toHaveProperty('occupied', 0);

    // Delete
    const del = await request(app).delete(`/occupied-space-logs/${logId}`);
    expect(del.status).toBe(204);
  });

  // Additional tests (rooms list, study-spaces, etc.) can be added here
});
