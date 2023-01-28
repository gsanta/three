
#include <catch2/catch_test_macros.hpp>
#include "../src/maths/vec2.h"

using namespace spright::maths;

TEST_CASE("Adds 2 vectors", "[vec2::operator+]")
{
	Vec2 result = Vec2(2, 2) + Vec2(3, 1);
	REQUIRE(result.x == 5);
	REQUIRE(result.y == 3);
}

TEST_CASE("Subtracts 2 vectors", "[vec2::operator-]")
{
	Vec2 result = Vec2(2, 2) - Vec2(3, 1);
	REQUIRE(result.x == -1);
	REQUIRE(result.y == 1);
}

TEST_CASE("Multiplies 2 vectors", "[vec2::operator*]")
{
	Vec2 result = Vec2(2, 2) * Vec2(3, 1);
	REQUIRE(result.x == 6);
	REQUIRE(result.y == 2);
}

TEST_CASE("Divides 2 vectors", "[vec2::operator/]")
{
	Vec2 result = Vec2(6, 2) / Vec2(3, 2);
	REQUIRE(result.x == 2);
	REQUIRE(result.y == 1);
}

TEST_CASE("Adds right vector to left vector", "[vec2::operator+=]")
{
	Vec2 vec(2, 1);
	vec += Vec2(3, 5);
	REQUIRE(vec.x == 5);
	REQUIRE(vec.y == 6);
}

TEST_CASE("Subtracts right vector from left vector", "[vec2::operator-=]")
{
	Vec2 vec(3, 5);
	vec -= Vec2(2, 1);
	REQUIRE(vec.x == 1);
	REQUIRE(vec.y == 4);
}

TEST_CASE("Multiplies right vector to left vector", "[vec2::operator*=]")
{
	Vec2 vec(3, 5);
	vec *= Vec2(2, 3);
	REQUIRE(vec.x == 6);
	REQUIRE(vec.y == 15);
}