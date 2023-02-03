#define STB_IMAGE_WRITE_IMPLEMENTATION

#include <cstdint>
#include <stddef.h>
#include "../src/engine/system/window/window.h"
#include "../src/maths/vec2.h"
#include "../src/maths/mat4.h"
#include "../src/engine/maths/mathFuncs.h"
// #include "utils/timer.h"
#include "../src/engine/system/utils/fileUtils.h"
#include "../src/engine/graphics/shader/shader.h"
#include "../src/engine/graphics/buffer/buffer.h"
#include "../src/engine/graphics/buffer/indexBuffer.h"
#include "../src/engine/graphics/buffer/vertexArray.h"

#include "../src/engine/graphics/renderer/renderer2d.h"
#include "../src/engine/graphics/renderable/renderable2d.h"
#include "../src/engine/graphics/renderable/rect2d.h"
#include "../src/engine/graphics/renderer/batchRenderer2d.h"
#include "../src/engine/graphics/layer/dimensions.h"

#include <vector>

#include <time.h>
#include "../src/engine/graphics/layer/tileLayer.h"
#include "../src/engine/graphics/renderable/group.h"
#include "../src/app/editor.h"
#include "../src/app/editor_api.h"
// #define SPARKY_EMSCRIPTEN 0

using namespace ::engine::graphics;
using namespace ::engine::system;

Window *window = nullptr;
spright::Editor *editor = nullptr;

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>

void setWindowSize(int width, int height)
{
	if (window != nullptr)
	{
		window->setSize(width, height);
		Dimensions newDim = editor->getDocumentHandler()->getCameraDimensions(editor->getDocumentHandler()->getActiveDocument()->dimensions);

		editor->getDocumentHandler()->getActiveDocument()->getCamera()->updateWindowSize(OrthoProjectionInfo(newDim.left, newDim.right, newDim.bottom, newDim.top));
	}
}

void addActiveTool(std::string toolName)
{
	if (editor != nullptr)
	{
		editor->getToolHandler()->setSelectedTool(toolName);
	}
}

void removeActiveTool(std::string toolName)
{
	if (editor != nullptr)
	{
		editor->getToolHandler()->removeActiveTool(toolName);
	}
}

std::vector<std::string> getLayers()
{
	std::vector<Layer *> &layers = editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->getLayers();

	std::vector<std::string> target;

	for (Layer *layer : layers)
	{
		target.push_back(layer->getLayerDescription().dump());
	}

	return target;
}

void createLayer(std::string name, std::string id)
{
	editor->getDocumentHandler()->createUserLayer(name, id);
}

void enableLayer(std::string id)
{
	Layer *layer = editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->getLayer(id);

	if (layer != nullptr)
	{
		layer->setEnabled(true);
	}
}

void disableLayer(std::string id)
{
	Layer *layer = editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->getLayer(id);

	if (layer != nullptr)
	{
		layer->setEnabled(false);
	}
}

void setActiveLayer(std::string id)
{
	editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->setActiveLayer(id);
}

void setBrushSize(int size)
{
	spright::tool::BrushTool *brushTool = dynamic_cast<spright::tool::BrushTool *>(editor->getToolHandler()->getTool("brush"));

	brushTool->setSize(size);
}

void exportImage()
{
	editor->getImageExport()->exportImage(editor->getDocumentHandler()->getActiveDocument());
}

int getImageData()
{
	return reinterpret_cast<int>(editor->getImageExport()->getImageData());
}

size_t getImageSize()
{
	return editor->getImageExport()->getImageSize();
}

EMSCRIPTEN_BINDINGS(engine2)
{
	emscripten::register_vector<std::string>("VectorString");

	emscripten::function("setWindowSize", &setWindowSize);
	emscripten::function("addActiveTool", &addActiveTool);
	emscripten::function("removeActiveTool", &removeActiveTool);
	emscripten::function("getLayers", &getLayers);
	emscripten::function("createLayer", &createLayer);
	emscripten::function("enableLayer", &enableLayer);
	emscripten::function("disableLayer", &disableLayer);
	emscripten::function("setActiveLayer", &setActiveLayer);
	emscripten::function("setBrushSize", &setBrushSize);
	emscripten::function("exportImage", &exportImage);
	emscripten::function("getImageData", &getImageData);
	emscripten::function("getImageSize", &getImageSize);
}

std::string getEngineData()
{
	if (editor != nullptr)
	{
		return editor->getDocumentHandler()->getActiveDocument()->getJson();
	}
}

void setEngineData(std::string json)
{
	if (editor != nullptr)
	{
		editor->getDocumentHandler()->getActiveDocument()->getLayerHandler()->getActiveLayer()->setJson(json);
	}
}

void setColor(unsigned int color)
{
	if (editor != nullptr)
	{
		editor->getServices()->getColorPalette()->color = color;
	}
}

EMSCRIPTEN_BINDINGS(editor)
{
	emscripten::function("getEngineData", &getEngineData);
	emscripten::function("setEngineData", &setEngineData);
	emscripten::function("setColor", &setColor);
}

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
	spright::maths::Vec3 la = spright::maths::Vec3(-3, 0, -5);
	spright::maths::Vec3 lb = spright::maths::Vec3(3, 3, 0);
	spright::maths::Vec3 p1 = spright::maths::Vec3(-1, 1, 0);
	spright::maths::Vec3 p2 = spright::maths::Vec3(1, 1, 0);
	spright::maths::Vec3 p3 = spright::maths::Vec3(0, -1, 0);

	spright::maths::Vec3 res = ::engine::maths::linePlaneIntersection(la, lb, p1, p2, p3);

	editor = new spright::Editor();
	window = editor->getWindow();

	// Group* group = new Group(Mat4::translation(maths::Vec3(-5.0f, 5.0f, 0.0f)));
	// group->add(new Rect2D(0, 0, 6, 3, maths::Vec4(1, 1, 1, 1)));
	// group->add(new Rect2D(0.5f, 0.5f, 0.5f, 2.0f, maths::Vec4(1, 0, 1, 1)));
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

		editor->getRendering()->render();
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
