cmake_minimum_required(VERSION 3.16)

project(Editor VERSION 1.0.0 LANGUAGES CXX)

set (CMAKE_CXX_STANDARD 14)
set(CMAKE_VERBOSE_MAKEFILE on)

include(FetchContent)

FetchContent_Declare(json
  GIT_REPOSITORY https://github.com/ArthurSonzogni/nlohmann_json_cmake_fetchcontent
  GIT_TAG v3.9.1)

FetchContent_GetProperties(json)
if(NOT json_POPULATED)
  FetchContent_Populate(json)
  add_subdirectory(${json_SOURCE_DIR} ${json_BINARY_DIR} EXCLUDE_FROM_ALL)
endif()


file(GLOB_RECURSE SOURCES "../src/*.cpp")

add_executable(spright ${SOURCES})

target_link_libraries(spright nlohmann_json::nlohmann_json)

set_target_properties(spright PROPERTIES LINK_FLAGS  "-lembind -s ASSERTIONS -s ALLOW_MEMORY_GROWTH -s USE_GLFW=3 -s FULL_ES3=1 -DSPARKY_EMSCRIPTEN=1 --memory-init-file 0 --embed-file resources -gsource-map -g3 -O0")

add_definitions("-std=c++14")
add_definitions(-DSPARKY_EMSCRIPTEN=1)
