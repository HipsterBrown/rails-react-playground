const { main } = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: main,
        format: "cjs"
      }
    ],
    external: ["fs", "util", "path"]
  }
];
