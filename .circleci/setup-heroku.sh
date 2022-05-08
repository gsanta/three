#!/bin/bash

wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

cat > ~/.netrc << EOF
machine api.heroku.com
  login
  password $HEROKU_API_KEY
machine git.heroku.com
  login
  password $HEROKU_API_KEY
EOF

heroku git:remote -a $HEROKU_APP
git remote rename heroku backend-heroku
