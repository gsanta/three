#!/bin/bash

rm -rf ../dist
mkdir -p ../dist/website
cp -r ../../website ../dist/website
cp ../src/index.js ../dist
