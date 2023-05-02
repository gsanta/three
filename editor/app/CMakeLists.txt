file(GLOB_RECURSE SOURCES "*.cpp")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR})

add_executable(spright ${SOURCES})

target_link_libraries(spright PUBLIC editor)
