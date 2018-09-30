const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  sport: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  host: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  date: {
      type: String,
      default: ''
  },
  hour: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  place: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  cost: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Event', EventSchema);
