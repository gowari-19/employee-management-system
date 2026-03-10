// backend/utils/employeeFunctions.js

exports.calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};

exports.calculateExperience = (joiningDate) => {
  const diff = Date.now() - new Date(joiningDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
};
