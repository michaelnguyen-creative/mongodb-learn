const { MongoClient } = require('mongodb')

const { ATLAS_URI } = process.env
const mongoClient = new MongoClient(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let _db

module.exports = {
  connectToServer: async () => {
    try {
      // Verify if we got a good 'database' object
      const client = await mongoClient.connect()
      if (!client) throw new Error
      _db = client.db('employees')
      // console.log('_db', _db)
      console.log('Successfully connected to MongoDb')
    } catch (err) {
      console.log('error connecting to MongoDB', err)
    }
  },
  getDb: () => _db
}