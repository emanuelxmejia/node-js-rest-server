const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Roe is required']
  }
});

module.exports = model( 'Role', RoleSchema )