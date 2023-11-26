#include "../src/maths/mat4.h"
#include "../src/maths/vec3.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

using namespace spright::maths;


TEST_CASE("Mat4 orthographic", "[mat4]")
{
    SECTION("it converts screen cordinates to normalized device coordinates")
    {
        Mat4 proj = Mat4::orthographic(-10, 10, -5, 5, 1, -1);

        Vec3 pos(-10, -5, 0);

        Vec3 result = proj * pos;

        REQUIRE(result.x == -1);
        REQUIRE(result.y == -1);

        pos = Vec3(10, 5, 1);
        result = proj * pos;

        REQUIRE(result.x == 1);
        REQUIRE(result.y == 1);

        pos = Vec3(0, 0, 1);
        result = proj * pos;

        REQUIRE(result.x == 0);
        REQUIRE(result.y == 0);
    }
}
