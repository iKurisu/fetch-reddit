const fetch = require("node-fetch");
const { urlFromPermalink } = require("../utils/url");

const fetchPost = async permalink => {
  const response = await fetch(urlFromPermalink(permalink));
  return response.json();
};

const getPostBody = response => response[0].data.children[0].data.selftext;

module.exports = async permalink => getPostBody(await fetchPost(permalink));
