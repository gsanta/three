#!/bin/bash

mkdir -p deploy
cp -r ../dist deploy
cp -r ../static deploy
cp index.js deploy
