cmake_minimum_required(VERSION 3.16)

project(Spright VERSION 1.0.0 LANGUAGES CXX)

option(CODE_COVERAGE "Enable code coverage" OFF)
option(INCLUDE_TESTS "If true tests are compiled" OFF)
option(COMPILE_APP "Whether to compile the desktop app (e.g skip it when runing tests)" ON)
option(COVERAGE_REPORTER "Coverage reporter type: HTML or XML" "XML")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED On)
set(CMAKE_CXX_EXTENSIONS Off)
set(CMAKE_MODULE_PATH "${CMAKE_MODULE_PATH};${PROJECT_SOURCE_DIR}/cmake")

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

if(CODE_COVERAGE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

if(CODE_COVERAGE)
    include(CodeCoverage)
    append_coverage_compiler_flags()

    set(COVERAGE_TARGET_NAME "coverage")
    set(EXECUTABLE_NAME "unit_tests")
    set(EXCLUDE_PATH "/src/CMakeCCompilerId.c;tests/*;/usr/*;*/catch2/*;.*tests-coverage.*;/src/src/stb_image_write.h;/src/build/tests-coverage/*")
    set(BASE_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}")

    message("BASE_DIRECTORY: ${BASE_DIRECTORY}")

    if (COVERAGE_REPORTER STREQUAL "XML")
        setup_target_for_coverage_gcovr_xml(NAME ${COVERAGE_TARGET_NAME} EXECUTABLE ${EXECUTABLE_NAME} EXCLUDE ${EXCLUDE_PATH} BASE_DIRECTORY ${BASE_DIRECTORY})
    elseif(COVERAGE_REPORTER STREQUAL "HTML")
        setup_target_for_coverage_lcov(NAME ${COVERAGE_TARGET_NAME} EXECUTABLE ${EXECUTABLE_NAME} EXCLUDE ${EXCLUDE_PATH} BASE_DIRECTORY ${BASE_DIRECTORY})
    else()
        message(FATAL_ERROR "Invalid COVERAGE_REPORTER option: ${COVERAGE_REPORTER}")
    endif()
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
