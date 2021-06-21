module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "preset-react": { "throwIfNamespace": false },
        "styled-jsx": {
          "plugins": [
          ]
        },
        "preset-env": {},
      }
    ]
  ],
  "plugins": [
    [
      "styled-jsx/babel",
      {
        "optimizeForSpeed": true,
      }
    ],
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
