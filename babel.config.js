module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "preset-react": { "throwIfNamespace": false },
        "preset-env": {},
      }
    ]
  ],
  "plugins": [
    [
      "babel-plugin-root-import"
    ],
    [
      "styled-components",
      {
        "ssr": true
      }
    ],
    [
      "macros"
    ],
  ]
}
