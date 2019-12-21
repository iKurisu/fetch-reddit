const { fetchSubreddit } = require("./api/index");

fetchSubreddit(
  "learnprogramming"
).then(console.log);