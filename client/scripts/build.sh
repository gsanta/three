#!/bin/bash

mkdir -p deploy
cp -r dist deploy
cp -r static deploy
cp scrips/index.js deploy
