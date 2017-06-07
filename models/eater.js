import mongoose from 'mongoose'
import * as db from './'

var eaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  favoriteTopping: String,
  tacos: [{
    ref: 'Taco',
    type: mongoose.Schema.Types.ObjectId
  }]
})

eaterSchema.pre('remove', async function(next){
  // find all the tacos....that have an eater property which is the id of what i will removed
  await db.Taco.remove({eater: this._id})
  next()
})

export default mongoose.model('Eater', eaterSchema)

// module.exports = Eater
