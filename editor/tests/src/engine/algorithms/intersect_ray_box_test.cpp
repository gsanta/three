#include "../../test_helpers/matchers/equals_vec3_approx_matcher.h"
#include "../src/engine/algorithms/intersect_ray_box.h"
#include "../src/engine/graphics/mesh/builders/box_builder.h"

#include <catch2/catch_approx.hpp>
#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

SCENARIO("Ray and box intersection")
{
    GIVEN("a box at the origin")
    {
        Box box = BoxBuilder().setWidth(3).setHeight(2).setDepth(4).build();

        WHEN("ray origin is inside the box")
        {
            Vec3 origin(1, 1, 1);
            Ray3 ray(origin, Vec3(1, 0, 0));

            THEN("hitpoint is inside of the box")
            {
                Vec3 hitPoint;
                bool intersect = intersect_ray_box(box.getBounds(), ray, hitPoint);

                REQUIRE(intersect == true);
                REQUIRE_THAT(hitPoint, EqualsVec3Approx(origin));
            }
        }

        WHEN("ray origin is to the right of the box and direction is left")
        {
            Vec3 origin(5, 0, 0);
            Vec3 direction(-1, 0, 0);
            Ray3 ray(origin, direction);

            THEN("hitpoint is on the right plane of the box")
            {
                Vec3 hitPoint;
                bool intersect = intersect_ray_box(box.getBounds(), ray, hitPoint);

                REQUIRE(intersect == true);
                REQUIRE_THAT(hitPoint, EqualsVec3Approx(Vec3(1.5, 0, 0)));
            }
        }
    }

    GIVEN("a box not at the origin")
    {
        Box box = BoxBuilder().setWidth(5).setHeight(5).setDepth(5).setPos(Vec3(5, 5, 2)).build();

        WHEN("ray goes through (5, 3, 2.5)")
        {
            Vec3 point(5, 2.5, 3);

            WHEN("ray starts from the origin")
            {
                Vec3 origin(0, 0, 0);
                Ray3 ray = Ray3::fromTwoPoints(origin, point);

                THEN("intersection is at the bottom")
                {
                    Vec3 hitPoint;
                    bool intersect = intersect_ray_box(box.getBounds(), ray, hitPoint);

                    REQUIRE(intersect == true);
                    REQUIRE_THAT(hitPoint, EqualsVec3Approx(Vec3(5, 2.5, 3)));
                }
            }

            WHEN("ray starts from the front of the box")
            {
                Vec3 origin(5, 5, 10);
                Ray3 ray = Ray3::fromTwoPoints(origin, point);

                THEN("intersection is at the bottom")
                {
                    Vec3 hitPoint;
                    bool intersect = intersect_ray_box(box.getBounds(), ray, hitPoint);

                    REQUIRE(intersect == true);
                    REQUIRE_THAT(hitPoint, EqualsVec3Approx(Vec3(5, 3.03571, 4.5)));
                }
            }
        }
    }
}
