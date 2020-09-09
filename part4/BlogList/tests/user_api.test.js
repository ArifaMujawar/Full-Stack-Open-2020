const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const api = supertest(app);

const helper = require("./test_helper");
const initialData = [
  {
    name: "",
    password: "124qwqwe",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
});

describe("tests to check addition of user", () => {
  test("reject invalid user and return status 400", async () => {
    await api.post("/api/users").send(initialData[0]).expect(400);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secureKEY", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    console.log('users at start -----', usersAtStart)
    const newUser = {
      username: "abcd",
      name: "abcd",
      password: "abc123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const newUser = {
      name: "abcd",
      username: "abcd",
      password: "abc123",
    };
    
      await api.post('/api/users').send(newUser).expect(200)
    
    const users = await helper.usersInDb();

   

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username to be unique");

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd).toHaveLength(users.length);
  });

  test("creation fails, if username is less than 3 characters", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      name: "abcd",
      username: "ab",
      password: "abc1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username too short"
    );

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd).toHaveLength(users.length);
  });

  test("creation fails if password is shorter than 3 characters", async () => {
    const users = await helper.usersInDb();

    const newUser = {
      name: "abcd",
      username: "abc",
      password: "a1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password too short"
    );

    const userAtEnd = await helper.usersInDb();
    expect(userAtEnd).toHaveLength(users.length);
  });
});
