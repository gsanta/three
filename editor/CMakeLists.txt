cmake_minimum_required(VERSION 3.16)

project(Spright VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED On)
set(CMAKE_CXX_EXTENSIONS Off)

set(CMAKE_VERBOSE_MAKEFILE on)

include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2
  GIT_TAG v3.3.0
  GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(Catch2)

add_subdirectory(src)
add_subdirectory(app)
add_subdirectory(tests)
