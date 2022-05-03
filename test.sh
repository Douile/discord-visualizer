#!/bin/sh

MESSAGEDATA="
[
  {\"username\":\"Test user\", \"content\": \"Test message\"},
  {\"username\":\"Test user 2\", \"content\": \"Test message 2\", \"bot\":false}
]
"

cat <<EOF > index.html
<!DOCTYPE HTML>
<html><head>
<link rel="stylesheet" href="./css/discord.css">
<link rel="stylesheet" href="./css/codemirror-one-dark.css">
<link rel="stylesheet" href="./css/tachyons.css">
</head><body>
$(node ./lib/index.js "${MESSAGEDATA}")
</body>
</html>
EOF

xdg-open ./index.html
