module.exports = {
  "presets": [
    [
      "next/babel",
    ]
  ],
  "plugins": [
    [
      "babel-plugin-root-import"
    ],
    [
      "styled-components",
      {
        "ssr": false
      }
    ],
    [
      "macros"
    ],
  ]
}