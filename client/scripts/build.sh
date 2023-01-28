#!/bin/bash

mkdir -p deploy
cp -r dist/* deploy
cp -r static/* deploy
cp scripts/index.js deploy
