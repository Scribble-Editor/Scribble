module.exports = {
  title: "Scribble",
  description: "A text editor in your browser",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }]
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Reference", items: [
          { text: "User Databases", link: "/user-databases/" },
        ]
      },
      { text: "GitHub", link: "https://github.com/Scribble-Editor/Scribble" }
    ],
    sidebar: "auto",
    lastUpdated: true
  },
  repo: "Scribble-Editor/Scribble",
  repoLabel: "GitHub",
};