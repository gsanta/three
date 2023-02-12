#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include "../src/engine/graphics/layer/layer.h"
#include "../src/engine/graphics/layer/dimensions.h"
#include "../src/engine/graphics/camera/camera.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"
#include "../src/engine/graphics/layer/tileLayer.h"

using namespace ::spright::engine;

TEST_CASE("Layer add", "[layer]") {
	SECTION("can add a renderable to the layer") {
		
		//Camera* camera = new Camera(800, 600, Dimensions(-16, 16, -16, 16), 0, 1);

		//TileLayer layer("layer", "id", new HeadlessShader(), new HeadlessRenderer2D(), camera, Dimensions(0, 100, 0, 200));

		//Rect2D* rect = new Rect2D(0, 0, 1, 1, 0x00000000);

		//layer.add(rect);

		//layer.
	}
}