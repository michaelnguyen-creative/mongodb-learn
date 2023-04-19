const express = require('express')
const dbo = require('../db/conn')
const { ObjectId } = require('mongodb')

const recordRoutes = express.Router()

recordRoutes.get('/', async (_req, res) => {
  try {
    let db = dbo.getDb()
    const cursor = await db.collection('records').find({})
    let results = await cursor.toArray()
    res.status(200).json(results)
  } catch (error) {
    console.log('error:', error)
  }
})

recordRoutes.get('/:id', async (req, res) => {
  let db = dbo.getDb()
  let myQuery = { _id: new ObjectId(req.params.id) }
  try {
    let results = await db.collection('records').findOne(myQuery)
    res.status(200).json(results)
  } catch (error) {
    console.log('error', error)
  }
})

recordRoutes.post('/add', async (req, res) => {
  let db = dbo.getDb()
  let { name, position, level } = req.body
  try {
    const result = await db
      .collection('records')
      .insertOne({ name, position, level })

    console.log('1 document created')
    res.status(201).json(result)
  } catch (error) {
    console.log('error', error)
  }
})

recordRoutes.post('/update/:id', async (req, res) => {
  let db = dbo.getDb()
  let myQuery = { _id: new ObjectId(req.params.id) }
  let newValues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  }
  try {
    const result = await db.collection('records').updateOne(myQuery, newValues)

    console.log('1 document updated')
    res.status(200).json(result)
  } catch (error) {
    console.log('error', error)
  }
})

recordRoutes.delete('/:id', async (req, res) => {
  let db = dbo.getDb()
  let myQuery = { _id: new ObjectId(req.params.id) }
  try {
    await db.collection('records').deleteOne(myQuery)

    console.log('1 document deleted')
    res.status(204).end()
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = recordRoutes
