cmake_minimum_required(VERSION 3.16)

project(Spright VERSION 1.0.0 LANGUAGES CXX)

option(CODE_COVERAGE "Enable code coverage" OFF)
option(INCLUDE_TESTS "If true tests are compiled" OFF)
option(COMPILE_APP "Whether to compile the editor" ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED On)
set(CMAKE_CXX_EXTENSIONS Off)
set(CMAKE_MODULE_PATH "${CMAKE_MODULE_PATH};${PROJECT_SOURCE_DIR}/cmake")

if(CODE_COVERAGE)
  include(CodeCoverage)
  append_coverage_compiler_flags()
  setup_target_for_coverage_gcovr_xml(NAME coverage EXECUTABLE unit_tests EXCLUDE "/src/CMakeCCompilerId.c" BASE_DIRECTORY ../results/coverage)
endif()

set(CMAKE_VERBOSE_MAKEFILE on)

add_subdirectory(src)

if (COMPILE_APP)
  add_subdirectory(app)
endif()

if (INCLUDE_TESTS)
  enable_testing()
endif()

add_subdirectory(tests)
