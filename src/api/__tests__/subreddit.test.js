import test from "ava";
import fetchSubreddit from "../subreddit";

test.serial("handles invalid subreddit", async t => {
  const response = await fetchSubreddit("random_sub555");
  t.is(response, "Sorry, this subreddit does not exist.");
});

test.serial("fetches subreddit correctly", async t => {
  const response = await fetchSubreddit("fitness");
  t.not(response.length, 0);
});
