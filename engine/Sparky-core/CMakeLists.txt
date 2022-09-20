cmake_minimum_required(VERSION 3.16)

project(Editor VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB_RECURSE SOURCES "main.cpp" "src/*.cpp")


add_executable(sparky ${SOURCES})
target_link_libraries(sparky ${CMAKE_CURRENT_SOURCE_DIR}/../Dependencies/GLEW/lib/glew32.lib ${CMAKE_CURRENT_SOURCE_DIR}/../Dependencies/GLFW/lib-vc2019/glfw3.lib)
target_include_directories(sparky
 PRIVATE
  ../Dependencies/GLEW/include
  ../Dependencies/GLFW/include)

set_target_properties(sparky PROPERTIES LINK_FLAGS  "-s USE_GLFW=3 -O3 -lembind")

add_definitions("-std=c++11")
add_definitions(-DSPARKY_EMSCRIPTEN=1)
