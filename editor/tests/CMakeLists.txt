set(TEST_MAIN "unit_tests")
file(GLOB_RECURSE SOURCES "*.cpp")
set(TEST_SOURCES ${SOURCES})
set(TEST_INCLUDES "./")

include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2
  GIT_TAG v3.3.0
  GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(Catch2)

add_executable(${TEST_MAIN} ${TEST_SOURCES})
target_include_directories(${TEST_MAIN} PUBLIC ${TEST_INCLUDES})
target_link_libraries(${TEST_MAIN} PUBLIC editor_for_tests Catch2::Catch2WithMain)

target_compile_definitions(editor_for_tests PRIVATE -DSPRIGHT_TEST)
