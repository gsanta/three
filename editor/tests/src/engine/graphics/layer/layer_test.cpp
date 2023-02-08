#include <catch2/catch_test_macros.hpp>
#include <catch2/catch_approx.hpp>
#include "../src/engine/graphics/layer/layer.h"
#include "../src/engine/graphics/layer/dimensions.h"
#include "../src/engine/graphics/camera/camera.h"
#include "../src/engine/graphics/impl/headless/headless_renderer2d.h"
#include "../src/engine/graphics/impl/headless/headless_shader.h"

using namespace ::engine::graphics;
using namespace ::spright::engine;

TEST_CASE("Layer add", "[layer]") {
	SECTION("can add a renderable to the layer") {
		
		//Layer layer("layer", "id", new HeadlessRenderer2D(), new HeadlessShader(), new Camera(), Dimensions(0, 100, 0, 200));

	}
}