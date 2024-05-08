#!/bin/bash

mkdir -p deploy
cp -r public/* deploy
cp -r static/* deploy

cp -r deploy/* ../backend/public
rm ../backend/public/index.html
