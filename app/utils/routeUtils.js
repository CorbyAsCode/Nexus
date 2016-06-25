var exports = module.exports = {};

// Convert a true or false string to a boolean
exports.checkForBooleans = function checkForBooleans(value) {
  if (value.match(/^(true|false)$/)) {
    return ('true' === value);
  } else {
    return value;
  }
};

// Check if a string is an object
exports.stringToObj = function stringToObj(string) {
  var value = null;
  try {
    console.log('Trying to convert string to object: ' + string);
    value = JSON.parse(string);
  } catch (e) {
    console.log('stringToObj error: ' + string + ' | ' + e);
    value = string;
  }
  return value;
};

/*
exports.validateQuery = function validateQuery(queryObject) {
  var newQueryObj = {};
  for (var attr in queryObject) {
    if (queryObject[attr].match(/^(true|false)$/)) {
      newQueryObj[attr] = ('true' === queryObject[attr]);
    } else {
      newQueryObj[attr] = queryObject[attr];
    }
  }
  return newQueryObj;
};
*/

