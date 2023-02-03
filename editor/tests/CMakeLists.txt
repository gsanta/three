set(TEST_MAIN "unit_tests")
set(TEST_SOURCES "main.cpp" "maths/vec2_test.cpp" "src/engine/graphics/renderable/rect2d_test.cpp")
set(TEST_INCLUDES "./")

add_executable(${TEST_MAIN} ${TEST_SOURCES})
target_include_directories(${TEST_MAIN} PUBLIC ${TEST_INCLUDES})
target_link_libraries(${TEST_MAIN} PUBLIC editor Catch2::Catch2WithMain)
