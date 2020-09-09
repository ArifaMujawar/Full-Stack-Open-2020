
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')


usersRouter.post('/', async (req, res)=>{
    const body = req.body
    const userExists = await User.findOne({username:body.username})
    if(userExists){
        return res.status(400).json({error:`username to be unique`})
    }
    if (body.username === undefined || body.password === undefined) {
        return res.status(400).json({ error: 'username or password missing' })
      }
    if(body.password.length <= 3){
        return res.status(400).json({error:'password too short'})
    }
    if(body.username.length <= 3){
        return res.status(400).json({error:'username too short'})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    console.log('password hash ', passwordHash)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)

})  


usersRouter.get('/', async (req, res)=>{
    const users = await User.find({}).populate('Blog',{title:1, author:1})
    res.json(users)//.map(u=> u.toJSON())
})
module.exports = usersRouter
