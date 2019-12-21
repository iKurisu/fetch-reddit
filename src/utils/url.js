const url = "https://www.reddit.com";

exports.subredditUrl = sub => url + "/r/" + sub + ".json";
exports.urlFromPermalink = permalink => url + permalink + ".json";
