var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectName: { type: String, required: true, unique: true},
  projectGroup: String,
  pointsOfContact: [{
                      name: String,
                      email: String,
                      phone: String,
                   }],
  projectUrl: String,
  creationDate: {type: Date, default: Date.now},
  updatedDate: Date,
});

projectSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.


var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
