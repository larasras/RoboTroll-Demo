const storyDB = require("../storyGenerator/db");

exports.generateStoryPlot = (genre) => {
  const story =
    storyDB.stories_according_to_genre[genre][
      Math.floor(
        Math.random() * storyDB.stories_according_to_genre[genre].length
      )
    ];
  const story_values = Object.values(story);
  let plot = story_values.map(
    (value) => value[Math.floor(Math.random() * value.length)]
  );
  return plot.join(".");
};
