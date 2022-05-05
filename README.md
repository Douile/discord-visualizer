# Discord visualizer

Compile Discord messages to HTML on the command line. Based on
[embed-visualizer][embed-visualizer].

## Usage

```shell
node ./lib/index.js "[{\"username\":\"Test\",\"content\":\"Test\"}]"
```

You need the CSS header files

```html
<link rel="stylesheet" href="https://cdn.rawgit.com/Douile/discord-visualizer/master/css/discord.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/Douile/discord-visualizer/master/css/codemirror-one-dark.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/Douile/discord-visualizer/master/css/tachyons.css">
```


[embed-visualizer]: https://github.com/leovoel/embed-visualizer
