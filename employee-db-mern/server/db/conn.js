const { MongoClient } = require('mongodb')

const { ATLAS_URI } = process.env
const client = new MongoClient(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var _db

module.exports = {
  connectToServer: async () => {
    try {
      // Verify if we got a good 'database' object
      const database = await client.connect()
      if (!database) throw new Error("'database' object is undefined")
      _db = db.db('employees')
      console.log('Successfully connected to MongoDb')
    } catch (err) {
      console.log('error connecting to MongoDB', err)
    }
  },
  getDb: () => _db
}