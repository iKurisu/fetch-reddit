import test from "ava";
import fetchSubreddit from "../subreddit";
import fetchComments from "../comments";

test.serial("handles invalid permalink", async t => {
  await t.throwsAsync(
    async () =>
      await fetchComments("/r/Fitness/coments/egle_routine_6_days_a_week/")
  );
});

test.serial("fetches post", async t => {
  const sub = await fetchSubreddit("fitness");
  const testPost = sub[0].permalink;

  await t.notThrowsAsync(async () => await fetchComments(testPost));

  const comments = await fetchComments(sub[0].permalink);
  t.not(comments.length, 0);
});
