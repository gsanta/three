//#include "./vec2_test.h"
#include <catch2/catch_test_macros.hpp>
#include "../src/maths/vec2.h"

using namespace spright::maths;

TEST_CASE("Adds 2 vectors", "[vec2::operator+]")
{
	Vec2 result = Vec2(2, 2) + Vec2(3, 1);
	REQUIRE(result.x == 5);
	REQUIRE(result.y == 3);
}
