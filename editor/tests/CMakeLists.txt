set(TEST_MAIN "unit_tests")
file(GLOB_RECURSE SOURCES "*.cpp")
list(FILTER SOURCES EXCLUDE REGEX ".*win_timer\\.cpp$")
set(TEST_SOURCES ${SOURCES})
set(TEST_INCLUDES "./")

add_executable(${TEST_MAIN} ${TEST_SOURCES})
target_include_directories(${TEST_MAIN} PUBLIC ${TEST_INCLUDES})
target_link_libraries(${TEST_MAIN} PUBLIC editor Catch2::Catch2WithMain)
