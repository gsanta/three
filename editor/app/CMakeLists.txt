file(GLOB_RECURSE SOURCES "*.cpp")

add_executable(spright ${SOURCES})

target_link_libraries(spright PUBLIC editor)
