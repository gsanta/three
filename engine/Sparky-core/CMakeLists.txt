cmake_minimum_required(VERSION 3.16)

project(Editor VERSION 1.0.0 LANGUAGES CXX)

file(GLOB_RECURSE SOURCES "src/*.cpp")
add_executable(Executable ${SOURCES})