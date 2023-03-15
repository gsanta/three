
// #define CATCH_CONFIG_MAIN
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "../src/stb_image_write.h"

#include <catch2/catch_test_macros.hpp>
#include "../src/my_lib.h"

TEST_CASE("Factorials are computed", "[factorial]")
{
  REQUIRE(factorial(1) == 1);
  REQUIRE(factorial(2) == 2);
  REQUIRE(factorial(3) == 6);
  REQUIRE(factorial(10) == 3'628'800);
}
