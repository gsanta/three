#!/bin/bash

mkdir -p client/deploy
cp -r client/dist/* deploy
cp -r client/static/* deploy
cp client/scrips/index.js client/deploy
