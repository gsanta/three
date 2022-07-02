#!/bin/bash

# Adds emsdk tools to PATH
source /path_to_emscripten/emsdk/emsdk_env.sh

INPUT=src/main.cpp
OPTIMISATIONS=-O3
MEMORY=32*1024*1024

if emcc $INPUT 
        $OPTIMISATIONS
        -o build/app_wasm.js
        -s TOTAL_MEMORY=$MEMORY
        -s WASM=1
          then;

echo "AWWW YEAH!";

#If WASM compiled ok generate fallback ASM code
emcc $INPUT 
     $OPTIMISATIONS
     -o build/app_fallback.js
     -s TOTAL_MEMORY=$MEMORY
     -s WASM=0
     --std=c++11

#reload browser tab or whatever

else
echo "HALP!";
fi
