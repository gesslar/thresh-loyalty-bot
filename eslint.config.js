import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: [
      "lints-js", // default files: []
      "lints-jsdoc", // default files: []
      "node", // default files: []
    ]
  })
]
