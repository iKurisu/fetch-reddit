import test from "ava";
import fetchSubreddit from "../subreddit";
import fetchPost from "../post";

test.serial("handles invalid permalink", async t => {
  await t.throwsAsync(
    async () =>
      await fetchPost("/r/Fitness/coments/egle_routine_6_days_a_week/")
  );
});

test.serial("fetches post", async t => {
  const sub = await fetchSubreddit("fitness");
  const testPost = sub[0].permalink;

  await t.notThrowsAsync(async () => await fetchPost(testPost));

  const post = await fetchPost(sub[0].permalink);

  t.is(typeof post, "string");
});
