#include "src/graphics/window/window.h";
#include "src/maths/vec2.h"
#include "src/maths/mat4.h"
//#include "src/utils/timer.h"
#include "src/utils/fileUtils.h"
#include "src/graphics/shader.h"
#include "src/graphics/buffers/buffer.h"
#include "src/graphics/buffers/indexBuffer.h"
#include "src/graphics/buffers/vertexArray.h"

#include "src/graphics/renderer2d.h"
#include "src/graphics/renderable2d.h"
#include "src/graphics/simple2dRenderer.h"
#include "src/graphics/Sprite.h"
#include "src/graphics/batchRenderer2D.h"

#include <vector>

#include <time.h>
#include "src/graphics/layers/tileLayer.h"
#include "src/graphics/groups/group.h"
#include "src/editor/editor.h"

//#define SPARKY_EMSCRIPTEN 0

#ifdef SPARKY_EMSCRIPTEN
	#include <emscripten/emscripten.h>
#else
	#include "src/graphics/texture/texture.h"
#endif

#define BATCH_RENDERER 1

#ifdef SPARKY_EMSCRIPTEN

static void dispatch_main(void* fp)
{
	std::function<void()>* func = (std::function<void()>*)fp;
	(*func)();
}

#endif

int main()
{
	using namespace sparky;
	using namespace graphics;
	using namespace maths;

	my_app::editor::Editor editor;

#ifdef SPARKY_EMSCRIPTEN
	Shader* shader = new Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");

	shader->enable();

	shader->setUniform2f("light_pos", Vec2(4.0f, 1.5f));

	TileLayer layer(shader);
	for (float y = -9.0f; y < 9.0f; y++) {
		for (float x = -16.0f; x < 16.0f; x++) {
			layer.add(new Sprite(x, y, 0.9f, 0.9f, 0xff0000ff));
		}
	}

#else
	//Shader* shader = new Shader("src/shaders/basic.vert", "src/shaders/basic.frag");

	//shader->enable();

	//shader->setUniform2f("light_pos", Vec2(4.0f, 1.5f));

	//Texture* texture = new Texture("test.png");
	//Texture* texture2 = new Texture("test2.png");

	//TileLayer layer(shader);
	//for (float y = -9.0f; y < 9.0f; y++) {
	//	for (float x = -16.0f; x < 16.0f; x++) {
	//		layer.add(new Sprite(x, y, 0.9f, 0.9f, rand() % 2 == 0 ? texture : texture2));
	//	}
	//}
#endif
	//Group* group = new Group(Mat4::translation(maths::Vec3(-5.0f, 5.0f, 0.0f)));
	//group->add(new Sprite(0, 0, 6, 3, maths::Vec4(1, 1, 1, 1)));
	//group->add(new Sprite(0.5f, 0.5f, 0.5f, 2.0f, maths::Vec4(1, 0, 1, 1)));
	//layer.add(group);

	GLint textIDs[] = {
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9
	};

	//shader->enable();
	//shader->setUniform1iv("textures", textIDs, 10);
	//shader->setUniform1i("tex", 0);

	//Timer time;
	float timer = 0;
	unsigned int frames = 0;


#ifdef SPARKY_EMSCRIPTEN
	std::function<void()> mainLoop = [&]() {
#else
	while (!editor.getWindow()->closed())
	{
#endif
		editor.getWindow()->clear();
		double x, y;
		editor.getWindow()->getMousePosition(x, y);
		//shader->enable();
		//shader->setUniform2f("light_pos", Vec2((float)(x * 32.0f / editor.getWindow()->getWidth() - 16.0f), (float)(9.0f - y * 18.0f / editor.getWindow()->getHeight())));
		//shader->disable();
		//layer.render();

		editor.getWindow()->update();
		frames++;
		//if (time.elapsed() - timer > 1.0f) {
		//	timer += 1.0f;
		//	printf("%d fps\n", frames);
		//	frames = 0;
		//}
#ifdef SPARKY_EMSCRIPTEN
	};
	emscripten_set_main_loop_arg(dispatch_main, &mainLoop, 0, 1);
#else
	}
#endif

	//delete texture;
	return 0;
}