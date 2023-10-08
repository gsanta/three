set(TEST_MAIN "unit_tests")
file(GLOB_RECURSE SOURCES "*.cpp")
set(TEST_SOURCES ${SOURCES} src/engine/graphics/camera/camera_test.cpp)
set(TEST_INCLUDES "./")

add_executable(${TEST_MAIN} ${TEST_SOURCES})
target_include_directories(${TEST_MAIN} PUBLIC ${TEST_INCLUDES})
target_link_libraries(${TEST_MAIN} PUBLIC editor_for_tests Catch2::Catch2WithMain)

target_compile_definitions(editor_for_tests PRIVATE -DSPRIGHT_TEST)
