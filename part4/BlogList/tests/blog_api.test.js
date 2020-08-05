const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");

const api = supertest(app);
const initialBlog = [
  {
    title: "String in my title",
    author: "wastr",
    url: "http://google.com",
    likes: 123,
  },
  {
    title: "Arifa in my title",
    author: "astr",
    url: "http://google.com",
    likes: 23,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});

  let noteObject = new Blog(initialBlog[0]);
  await noteObject.save();
});

test("blogs are returned as json", async () => {
  await api.get("/api/blogs").expect("Content-Type", /application\/json/);
});

test("verify unique identifier property", async () => {
  await api.post("/api/blogs").send(initialBlog[0]).expect(201);

  const response = await api.get("/api/blogs");

  expect(response.body[0]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
    })
  );

  expect(response.body[0].id).toBeDefined();
});

test("verify HTTP POST request", async () => {
  await Blog.deleteMany({});
  await api.post("/api/blogs").send(initialBlog[0]).expect(201);

  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(1);
});

test("verify if likes property is missing", async () => {
  await Blog.deleteMany({});
  const data = {
    title: "Arifa in my title",
    author: "astr",
    url: "http://google.com",
  };
  
  await api.post("/api/blogs").send(data).expect(201);
  const res = await api.get("/api/blogs");
  console.log(res.body);
  expect(res.body).toHaveLength(1);
});

test('url and title is missing', async () => {
  
  const data = {
    author:'sheep',
    like:9
  }

  await api.post('/api/blogs').send(data).expect(400)
})
afterAll(() => {
  mongoose.connection.close();
});
