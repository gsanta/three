#!/bin/bash

rm -rf dist
mkdir -p dist/website
cp -r ../website dist
cp src/index.js dist
