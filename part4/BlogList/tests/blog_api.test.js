const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const jwt = require('jsonwebtoken')

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
    // const response = await api.post("/api/login").send({
    //   username: "root",
    //   password: "secureKEY",
    // });
    // const token = response.body.token;
});

describe("when there is initially some blogs saved", () => {
 
  test("blogs are returned as json", async () => {
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);
  });

  test("all the blogs are returned", async () => {
    //await api.post("/api/blogs").send(initialBlog[0]).expect(201);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(1);
  });
  test("a specific title is within the returned blog", async () => {
    //await api.post("/api/blogs").send(initialBlog[1]).expect(201);
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    console.log("title ", titles);
    expect(titles).toContain("String in my title");
  });
});

describe("Viewing a specific blog", () => {
  test("verify unique identifier property is named as id", async () => {
   // await api.post("/api/blogs").send(initialBlog[0]).expect(201);

    const response = await api.get("/api/blogs");

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );

    expect(response.body[0].id).toBeDefined();
  });

  test("fails with status code 404 id is invalid", async () => {
    const invalidId = "234n2458kvs83n";

    await api.get(`/api/blogs/${invalidId}`).expect(404);
  });
});

describe("addition of new blog",  () => {
  test("verify HTTP POST request", async () => {
    const response = await api.post("/api/login").send({
      username: "root",
      password: "secureKEY",
    });
    const token = response.body.token;
    await Blog.deleteMany({});
    await api
      .post("/api/blogs")
      .send(initialBlog[0])
      .set({ Authorization: `bearer ${token}` })
      .expect(200);

    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(1);
  });

  test("url and title is missing", async () => {
    const data = {
      author: "sheep",
      like: 9,
    };
    const response = await api.post("/api/login").send({
      username: "root",
      password: "secureKEY",
    });
    const token = response.body.token;
    console.log("token is ", token);
    await api
      .post("/api/blogs")
      .send(data)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });

  test("verify if likes property is missing", async () => {
    await Blog.deleteMany({});
    const data = {
      title: "Arifa in my title",
      author: "astr",
      url: "http://google.com",
    };
    const response = await api.post("/api/login").send({
      username: "root",
      password: "secureKEY",
    });
    const token = response.body.token;

    await api
      .post("/api/blogs")
      .send(data)
      .set({ Authorization: `bearer ${token}` })
      .expect(200);
    const res = await api.get("/api/blogs");
    console.log(res.body);
    expect(res.body).toHaveLength(1);
  });
});

describe("deletion of a blog",  () => {
  test("succeeds with status code 204 if id is valid", async () => {
    // await api.post("/api/blogs").send(initialBlog[1]).set({ Authorization: `bearer ${token}` }).expect(201);
    // const blogs = await Blog.find({});
    // console.log("check here-------- ", blogs);

    // const BlogsAtStart = await Blog.find({}).map((blog) => {
    //   console.log('blog is ', blog);
    //   JSON.stringify(blog)});
    // console.log("BlogsAtStart ", BlogsAtStart);
    // const blogToDelete = BlogsAtStart[0];
    const respo = await api.post("/api/login").send({
      username: "root",
      password: "secureKEY",
    });
    const token = respo.body.token;
    
 const response = await api.post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(initialBlog[1])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const targetBlog = response.body


    await api.delete(`/api/blogs/${targetBlog.id}`).set({ Authorization: `bearer ${token}` }).expect(204);

    const blogs1 = await Blog.find({});
    const BlogsAtEnd = await blogs1.map((blog) => blog.toJSON());

    expect(BlogsAtEnd).toHaveLength(1);

    const contents = BlogsAtEnd.map((r) => r.author);

    expect(contents).not.toContain('astr');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
