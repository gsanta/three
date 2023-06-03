file(GLOB_RECURSE SOURCES "*.cpp")

add_executable(spright ${SOURCES})

file(COPY shaders DESTINATION .)

target_link_libraries(spright PUBLIC editor)
