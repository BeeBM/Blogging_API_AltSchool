const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define a schema
const Schema = mongoose.Schema;

//Enable Blogger ID 
const BloggerId = Schema.ObjectId;

//Define Blogger Schema
const BloggerSchema = new Schema({
    Id: BloggerId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists!'] //validation with custom message
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: { 
        type: String,
        required: false,
    }
});

// The code in the BloggerSchema.pre() function is called a pre-hook.
// Before the blogger information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
BloggerSchema.pre(
  'save',
  async function (next) {
      const blogger = this;
      const hash = await bcrypt.hash(this.password, 10);

      this.password = hash;
      next();
  }
);

// You will also need to make sure that the blogger trying to log in has the correct credentials. Add the following new method:
BloggerSchema.methods.isValidPassword = async function(password) {
  const blogger = this;
  const compare = await bcrypt.compare(password, blogger.password);

  return compare;
}


// Export the model
module.exports = mongoose.model('Bloggers', BloggerSchema); //The name of the collection in the database is Bloggers.