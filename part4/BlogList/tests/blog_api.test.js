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

  // let noteObject = new Blog(initialBlog[0]);
  // await noteObject.save();
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);
  });

  test("all the blogs are returned", async () => {
    await api.post("/api/blogs").send(initialBlog[0]).expect(201);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(1);
  });
  test("a specific title is within the returned blog", async () => {
    await api.post("/api/blogs").send(initialBlog[1]).expect(201);
    const response = await api.get('/api/blogs')

   

    const titles = response.body.map(r => r.title)
    console.log('title ', titles)
    expect(titles).toContain('Arifa in my title')
  });
});


describe('Viewing a specific blog', ()=>{
  test("verify unique identifier property is named as id", async () => {
    await api.post("/api/blogs").send(initialBlog[0]).expect(201);
  
    const response = await api.get("/api/blogs");
  
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  
    expect(response.body[0].id).toBeDefined();
  });

  test('fails with statuscode 404 id is invalid',async()=>{
    const invalidId = '234n2458kvs83n'

    await api.get(`/api/blogs/${invalidId}`).expect(404)
  })

  
})

describe('addition of new blog', async()=>{
  test("verify HTTP POST request", async () => {
    await Blog.deleteMany({});
    await api.post("/api/blogs").send(initialBlog[0]).expect(201);
  
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(1);
  });

  test("url and title is missing", async () => {
    const data = {
      author: "sheep",
      like: 9,
    };
  
    await api.post("/api/blogs").send(data).expect(400);
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
})


describe('deletion of a blog', async ()=>{
  test('succeeds with status code 204 if id is valid', async()=>{
    await api.post("/api/blogs").send(initialBlog[1]).expect(201);
    const blogs = await Blog.find({})
    console.log('check here-------- ', blogs)
    const BlogsAtStart = await blogs.map(blog => blog.toJSON())
    console.log('BlogsAtStart ', BlogsAtStart)
    const blogToDelete = BlogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogs1 = await Blog.find({})
    const BlogsAtEnd = await blogs1.map(blog => blog.toJSON())
    

    expect(BlogsAtEnd).toHaveLength(0)

    const contents = BlogsAtEnd.map(r => r.author)

    expect(contents).not.toContain(blogToDelete.author)
  })
})




afterAll(() => {
  mongoose.connection.close();
});
