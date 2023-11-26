#include "../../editor/test_helpers/builders/drawing3d_builder.h"
#include "../src/engine/graphics/camera/camera2d.h"
#include "../src/engine/graphics/mesh/meshes/box.h"

#include <catch2/catch_test_macros.hpp>

using namespace spright::engine;

SCENARIO("Drawing3d")
{
    GIVEN("an instance of Drawing3d")
    {
        Drawing3d drawing = Drawing3dBuilder().withBounds(Bounds(Vec2(2, 2), Vec2(10, 4))).build();

        Box box1(Vec3(1, 1, 2), 1, 2, 3, COLOR_BLUE);
        drawing.getGroup().add(box1);

        Box box2(Vec3(2, 2, 1), 1, 2, 3, COLOR_RED);
        drawing.getGizmoGroup().add(box2);

        Camera2d camera(BoundsInt(0, 0, 10, 8), -1.0f, 1.0f, 1);
        drawing.setCamera(camera);

        drawing.getRenderer().push(Mat4(3));

        THEN("it can be copied")
        {
            Drawing3d drawing2 = Drawing3dBuilder().build();
            drawing2 = drawing;

            REQUIRE(drawing2.getGroup().getRenderables().size() == 1);
            REQUIRE(drawing2.getGizmoGroup().getRenderables().size() == 1);
            REQUIRE(drawing2.getBounds() == drawing.getBounds());
            REQUIRE(*drawing2.getCamera() == *drawing.getCamera());
        }

        THEN("an other instance can be copy constructed")
        {
            Drawing3d drawing2 = drawing;

            REQUIRE(drawing2.getGroup().getRenderables().size() == 1);
            REQUIRE(drawing2.getGizmoGroup().getRenderables().size() == 1);
            REQUIRE(drawing2.getBounds() == drawing.getBounds());
            REQUIRE(*drawing2.getCamera() == *drawing.getCamera());
        }
    }
}
