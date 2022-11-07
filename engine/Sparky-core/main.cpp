#include "src/engine/system/window/window.h"
#include "src/engine/maths/vec2.h"
#include "src/engine/maths/mat4.h"
//#include "src/utils/timer.h"
#include "src/engine/system/utils/fileUtils.h"
#include "src/engine/graphics/shader/shader.h"
#include "src/engine/graphics/buffer/buffer.h"
#include "src/engine/graphics/buffer/indexBuffer.h"
#include "src/engine/graphics/buffer/vertexArray.h"

#include "src/engine/graphics/renderer/renderer2d.h"
#include "src/engine/graphics/renderable/renderable2d.h"
#include "src/engine/graphics/renderable/Sprite.h"
#include "src/engine/graphics/renderer/batchRenderer2D.h"

#include <vector>

#include <time.h>
#include "src/engine/graphics/layer/tileLayer.h"
#include "src/engine/graphics/renderable/group.h"
#include "src/app/editor.h"
#include "src/app/feature/canvas/cursor_light.h"

//#define SPARKY_EMSCRIPTEN 0

spright_engine::system::Window *window = nullptr;
spright_app::Editor *editor = nullptr;

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>

void setWindowSize(int width, int height)
{
	if (window != nullptr)
	{
		window->setSize(width, height);
	}
}

void setActiveTool(std::string toolName)
{
	if (editor != nullptr)
	{
		editor->getToolHandler()->setActiveTool(toolName);
	}
}

EMSCRIPTEN_BINDINGS(engine2)
{
	emscripten::function("setWindowSize", &setWindowSize);
	emscripten::function("setActiveTool", &setActiveTool);

}

std::string getEngineData() {
	if (editor != nullptr) {
		return editor->getDocumentHandler()->getActiveDocument()->getJson();
	}
}

void setEngineData(std::string json) {
	if (editor != nullptr) {
		editor->getDocumentHandler()->getActiveDocument()->getActiveLayer()->setJson(json);
	}
}

void setColor(unsigned int color) {
	if (editor != nullptr) {
		editor->getServices()->getColorPalette()->color = color;
	}
}


EMSCRIPTEN_BINDINGS(editor)
{
	emscripten::function("getEngineData", &getEngineData);
	emscripten::function("setEngineData", &setEngineData);
	emscripten::function("setColor", &setColor);
}

#else
#include "src/engine/graphics/texture/texture.h"
#endif

#define BATCH_RENDERER 1

#ifdef SPARKY_EMSCRIPTEN

static void dispatch_main(void *fp)
{
	std::function<void()> *func = (std::function<void()> *)fp;
	(*func)();
}

#endif

int main()
{
	editor = new spright_app::Editor();
	window = editor->getWindow();

	// Group* group = new Group(Mat4::translation(maths::Vec3(-5.0f, 5.0f, 0.0f)));
	// group->add(new Sprite(0, 0, 6, 3, maths::Vec4(1, 1, 1, 1)));
	// group->add(new Sprite(0.5f, 0.5f, 0.5f, 2.0f, maths::Vec4(1, 0, 1, 1)));
	// layer.add(group);

	GLint textIDs[] = {
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

	// shader->enable();
	// shader->setUniform1iv("textures", textIDs, 10);
	// shader->setUniform1i("tex", 0);

	// Timer time;
	float timer = 0;
	unsigned int frames = 0;

#ifdef SPARKY_EMSCRIPTEN
	std::function<void()> mainLoop = [&]()
	{
#else
	while (!editor->getWindow()->closed())
	{
#endif
		editor->getWindow()->clear();
		double x, y;
		editor->getWindow()->getMousePosition(x, y);
		// shader->enable();
		// shader->setUniform2f("light_pos", Vec2((float)(x * 32.0f / editor.getWindow()->getWidth() - 16.0f), (float)(9.0f - y * 18.0f / editor.getWindow()->getHeight())));
		// shader->disable();
		// layer.render();

		editor->getWindow()->update();
		frames++;
		// if (time.elapsed() - timer > 1.0f) {
		//	timer += 1.0f;
		//	printf("%d fps\n", frames);
		//	frames = 0;
		// }
#ifdef SPARKY_EMSCRIPTEN
	};
	emscripten_set_main_loop_arg(dispatch_main, &mainLoop, 0, 1);
#else
	}
#endif

	// delete texture;
	editor->cleanup();
	delete editor;
	return 0;
}
