const inquirer = require("inquirer");
const chalk = require("chalk");
const { fetchSubreddit, fetchPost, fetchComments } = require("./api/index");

inquirer
  .prompt([
    {
      name: "subreddit",
      message: "Which subreddit would you like to fetch?",
      validate: async input => {
        const response = await fetchSubreddit(input);
        if (typeof response === "object") {
          return true;
        }

        return response;
      }
    },
    {
      type: "list",
      name: "permalink",
      message: "Which post would you like to see?",
      choices: async answer => {
        const posts = await fetchSubreddit(answer.subreddit);

        return posts.map(post => ({ name: post.title, value: post.permalink }));
      },
      pageSize: 50
    }
  ])
  .then(async answers => {
    const post = await fetchPost(answers.permalink);
    
    console.log(post);

    inquirer
      .prompt([
        { type: "confirm", name: "loadComments", message: "Load comments?" }
      ])
      .then(async () => {
        const comments = await fetchComments(answers.permalink);

        comments.forEach((comment, i) =>
          console.log(
            `${comment.data.body}\n` +
              chalk.yellow(`by ${comment.data.author}\n`)
          )
        );
      });
  });
