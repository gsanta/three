#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include <vector>
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/app/tool/eraser_tool/eraser_stroke.h"
#include "../src/maths/vec2.h"

using namespace spright::editor;
using namespace spright::maths;

TEST_CASE("EraserStroke draw", "[eraser-stroke]") {
	SECTION("creates the rectangular stroke, eraser size is even, eraser position is at the origin") {
		int eraserSize = 4;
		float tileSize = 0.5f;

		Container container(Dimensions(-5.0f, 5.0f, -5.0f, 5.0f));

		TileLayer drawLayer("drawLayer", "id", Group<Rect2D>(new HeadlessRenderer2D()), &container);
		TileLayer eraseLayer("eraseLayer", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, tileSize);

		EraserStroke eraserStroke(&drawLayer, eraserSize);

		eraserStroke.draw(eraseLayer, Vec2(0, 0));

		std::vector<Rect2D*>& rects = drawLayer.getRenderables();

		// Top line
		REQUIRE(rects[0]->getCenterPosition2d().x == Catch::Approx(0.0f));
		REQUIRE(rects[0]->getCenterPosition2d().y == Catch::Approx(1.0f));
		REQUIRE(rects[0]->getSize().x == Catch::Approx(2.0f));
		REQUIRE(rects[0]->getSize().y == Catch::Approx(eraserStroke.getStrokeWidth()));

		// Bottom line
		REQUIRE(rects[2]->getCenterPosition2d().x == Catch::Approx(0.0f));
		REQUIRE(rects[2]->getCenterPosition2d().y == Catch::Approx(-1.0f));
		REQUIRE(rects[2]->getSize().x == Catch::Approx(2.0f));
		REQUIRE(rects[2]->getSize().y == Catch::Approx(eraserStroke.getStrokeWidth()));

		// Right line
		REQUIRE(rects[1]->getCenterPosition2d().x == Catch::Approx(1.0f));
		REQUIRE(rects[1]->getCenterPosition2d().y == Catch::Approx(0.0f));
		REQUIRE(rects[1]->getSize().x == Catch::Approx(eraserStroke.getStrokeWidth()));
		REQUIRE(rects[1]->getSize().y == Catch::Approx(2.0f));

		// Left line
		REQUIRE(rects[3]->getCenterPosition2d().x == Catch::Approx(-1.0f));
		REQUIRE(rects[3]->getCenterPosition2d().y == Catch::Approx(0.0f));
		REQUIRE(rects[3]->getSize().x == Catch::Approx(eraserStroke.getStrokeWidth()));
		REQUIRE(rects[3]->getSize().y == Catch::Approx(2.0f));
	}

	SECTION("creates the rectangular stroke, eraser size is odd, eraser position is at the origin") {
		int eraserSize = 3;
		float tileSize = 0.5f;

		Container container(Dimensions(-5.0f, 5.0f, -5.0f, 5.0f));

		TileLayer drawLayer("drawLayer", "id", Group<Rect2D>(new HeadlessRenderer2D()), &container);
		TileLayer eraseLayer("eraseLayer", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, tileSize);

		EraserStroke eraserStroke(&drawLayer, eraserSize);

		eraserStroke.draw(eraseLayer, Vec2(0, 0));

		std::vector<Rect2D*>& rects = drawLayer.getRenderables();

		// Top line
		REQUIRE(rects[0]->getCenterPosition2d().x == Catch::Approx(0.25f));
		REQUIRE(rects[0]->getCenterPosition2d().y == Catch::Approx(1.0f));
		REQUIRE(rects[0]->getSize().x == Catch::Approx(1.5f));
		REQUIRE(rects[0]->getSize().y == Catch::Approx(eraserStroke.getStrokeWidth()));

		// Bottom line
		REQUIRE(rects[2]->getCenterPosition2d().x == Catch::Approx(0.25f));
		REQUIRE(rects[2]->getCenterPosition2d().y == Catch::Approx(-0.5f));
		REQUIRE(rects[2]->getSize().x == Catch::Approx(1.5f));
		REQUIRE(rects[2]->getSize().y == Catch::Approx(eraserStroke.getStrokeWidth()));

		// Right line
		REQUIRE(rects[1]->getCenterPosition2d().x == Catch::Approx(1.0f));
		REQUIRE(rects[1]->getCenterPosition2d().y == Catch::Approx(0.25f));
		REQUIRE(rects[1]->getSize().x == Catch::Approx(eraserStroke.getStrokeWidth()));
		REQUIRE(rects[1]->getSize().y == Catch::Approx(1.5f));

		// Left line
		REQUIRE(rects[3]->getCenterPosition2d().x == Catch::Approx(-0.5f));
		REQUIRE(rects[3]->getCenterPosition2d().y == Catch::Approx(0.25f));
		REQUIRE(rects[3]->getSize().x == Catch::Approx(eraserStroke.getStrokeWidth()));
		REQUIRE(rects[3]->getSize().y == Catch::Approx(1.5f));
	}

	SECTION("creates the rectangular stroke when the eraser is not at the origin") {
		int eraserSize = 4;
		float tileSize = 0.5f;
		float translateX = 2.0f;
		float translateY = 3.0f;

		Container container(Dimensions(-5.0f, 5.0f, -5.0f, 5.0f));

		TileLayer drawLayer("drawLayer", "id", Group<Rect2D>(new HeadlessRenderer2D()), &container);
		TileLayer eraseLayer("eraseLayer", "id2", Group<Rect2D>(new HeadlessRenderer2D()), &container, tileSize);

		EraserStroke eraserStroke(&drawLayer, eraserSize);


		eraserStroke.draw(eraseLayer, Vec2(translateX, translateY));

		std::vector<Rect2D*>& rects = drawLayer.getRenderables();

		// Top line
		REQUIRE(rects[0]->getCenterPosition2d().x == Catch::Approx(0.0f + translateX));
		REQUIRE(rects[0]->getCenterPosition2d().y == Catch::Approx(1.0f + translateY));
		REQUIRE(rects[0]->getSize().x == Catch::Approx(2.0f));
		REQUIRE(rects[0]->getSize().y == Catch::Approx(eraserStroke.getStrokeWidth()));

		// Bottom line
		REQUIRE(rects[2]->getCenterPosition2d().x == Catch::Approx(0.0f + translateX));
		REQUIRE(rects[2]->getCenterPosition2d().y == Catch::Approx(-1.0f + translateY));
		REQUIRE(rects[2]->getSize().x == Catch::Approx(2.0f));
		REQUIRE(rects[2]->getSize().y == Catch::Approx(eraserStroke.getStrokeWidth()));

		// Right line
		REQUIRE(rects[1]->getCenterPosition2d().x == Catch::Approx(1.0f + translateX));
		REQUIRE(rects[1]->getCenterPosition2d().y == Catch::Approx(0.0f + translateY));
		REQUIRE(rects[1]->getSize().x == Catch::Approx(eraserStroke.getStrokeWidth()));
		REQUIRE(rects[1]->getSize().y == Catch::Approx(2.0f));

		// Left line
		REQUIRE(rects[3]->getCenterPosition2d().x == Catch::Approx(-1.0f + translateX));
		REQUIRE(rects[3]->getCenterPosition2d().y == Catch::Approx(0.0f + translateY));
		REQUIRE(rects[3]->getSize().x == Catch::Approx(eraserStroke.getStrokeWidth()));
		REQUIRE(rects[3]->getSize().y == Catch::Approx(2.0f));
	}
}