cmake_minimum_required(VERSION 3.16)

project(Editor VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB_RECURSE SOURCES "../Sparky-core/main.cpp" "../Sparky-core/src/*.cpp")
list(FILTER SOURCES EXCLUDE REGEX "../Sparky-core/src/engine/graphics/texture/texture.cpp")

add_executable(sparky ${SOURCES})
set_target_properties(sparky PROPERTIES LINK_FLAGS  "-lembind -s ASSERTIONS -s ALLOW_MEMORY_GROWTH -s USE_GLFW=3 -s FULL_ES3=1 -DSPARKY_EMSCRIPTEN=1 --memory-init-file 0 --embed-file res -O3")

add_definitions("-std=c++11")
add_definitions(-DSPARKY_EMSCRIPTEN=1)
