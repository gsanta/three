
#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include "../src/maths/vec2.h"

using namespace spright::maths;

TEST_CASE("Vec2 operator+", "[vec2]")
{
	Vec2 result = Vec2(2, 2) + Vec2(3, 1);
	REQUIRE(result.x == 5);
	REQUIRE(result.y == 3);
}

TEST_CASE("Vec2 operator-", "[vec2]")
{
	Vec2 result = Vec2(2, 2) - Vec2(3, 1);
	REQUIRE(result.x == -1);
	REQUIRE(result.y == 1);
}

TEST_CASE("Vec2 operator*", "[vec2]")
{
	Vec2 result = Vec2(2, 2) * Vec2(3, 1);
	REQUIRE(result.x == 6);
	REQUIRE(result.y == 2);
}

TEST_CASE("Vec2 operator/", "[vec2]")
{
	Vec2 result = Vec2(6, 2) / Vec2(3, 2);
	REQUIRE(result.x == 2);
	REQUIRE(result.y == 1);
}

TEST_CASE("Vec2 operator+=", "[vec2]")
{
	Vec2 vec(2, 1);
	vec += Vec2(3, 5);
	REQUIRE(vec.x == 5);
	REQUIRE(vec.y == 6);
}

TEST_CASE("Vec2 operator-=", "[vec2]")
{
	Vec2 vec(3, 5);
	vec -= Vec2(2, 1);
	REQUIRE(vec.x == 1);
	REQUIRE(vec.y == 4);
}

TEST_CASE("Vec2 operator*=", "[vec2]")
{
	Vec2 vec(3, 5);
	vec *= Vec2(2, 3);
	REQUIRE(vec.x == 6);
	REQUIRE(vec.y == 15);
}

TEST_CASE("Vec2 operator/=", "[vec2]")
{
	Vec2 vec(8, 3);
	vec /= Vec2(2, 3);
	REQUIRE(vec.x == 4);
	REQUIRE(vec.y == 1);
}

TEST_CASE("Vec2 operator==", "[vec2]")
{
	Vec2 vec(8, 3);
	Vec2 vec2(8, 3);
	Vec2 vec3(5, 5);
	REQUIRE(vec == vec2);
	REQUIRE(vec != vec3);
}

TEST_CASE("Vec2 distance", "[vec2]")
{
	Vec2 vec(8, 3);
	Vec2 vec2(5, 5);
	REQUIRE(Vec2::distance(vec, vec2) == Catch::Approx(3.60555f));
}