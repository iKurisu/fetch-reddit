const fetch = require("node-fetch");
const { urlFromPermalink } = require("../utils/url");

const fetchPost = async permalink => {
  const response = await fetch(urlFromPermalink(permalink));
  return response.json();
};

const getComments = response => response[1].data.children;

module.exports = async permalink => getComments(await fetchPost(permalink));
