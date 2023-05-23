'use strict';
const mongoose = require('mongoose');

mongoose.connect( process.env.MONGO_URI).then( _ => console.log('Connected mongoose success!...'))
.catch( err => console.error(`Error: connect:::`, err));

mongoose.set('debug', true);
mongoose.set('debug', { color: false });
mongoose.set('debug', { shell: true });

mongoose.connection.on('disconnected', function() {
  console.log('MongoDB::: disconnected');
});

process.on('SIGINT', async() => {
  await mongoose.disconnect();
  process.exit(0);
});

module.exports = mongoose;
