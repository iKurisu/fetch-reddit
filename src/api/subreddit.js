const fetch = require("node-fetch");
const pipe = require("../utils/pipe");
const { subredditUrl } = require("../utils/url");

const fetchSubreddit = async sub => {
  const response = await fetch(subredditUrl(sub));
  return response.json();
};

const handleInvalid = response => {
  if ((response.data && response.data.dist === 0) || response.error === 404) {
    return "Sorry, this subreddit does not exist.";
  }

  return response;
};

const handleQuarantine = response => {
  if (response.error === 403 && response.reason === "quarantined") {
    return "Sorry, this subreddit is quarantined and cannot be accessed.";
  }

  return response;
};

const getData = response => {
  if (typeof response !== "string") {
    return response.data.children.map(child => child.data);
  }

  return response;
};

module.exports = async sub =>
  pipe(handleInvalid, handleQuarantine, getData)(await fetchSubreddit(sub));
