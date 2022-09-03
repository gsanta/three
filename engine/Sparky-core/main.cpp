#include "src/graphics/window.h";
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

	Window window("Sparky!", 800, 600);

#ifdef SPARKY_EMSCRIPTEN
	Shader* shader = new Shader("res/shaders/basic.es3.vert", "res/shaders/basic.es3.frag");

	shader->enable();

	shader->setUniform2f("light_pos", Vec2(4.0f, 1.5f));

	TileLayer layer(shader);
	for (float y = -9.0f; y < 9.0f; y++) {
		for (float x = -16.0f; x < 16.0f; x++) {
			layer.add(new Sprite(x, y, 0.9f, 0.9f, Vec4(1.0f, 0, 0, 1.0f)));
		}
	}

#else
	Shader* shader = new Shader("src/shaders/basic.vert", "src/shaders/basic.frag");

	shader->enable();

	shader->setUniform2f("light_pos", Vec2(4.0f, 1.5f));

	Texture* texture = new Texture("test.png");
	Texture* texture2 = new Texture("test2.png");

	TileLayer layer(shader);
	for (float y = -9.0f; y < 9.0f; y++) {
		for (float x = -16.0f; x < 16.0f; x++) {
			layer.add(new Sprite(x, y, 0.9f, 0.9f, rand() % 2 == 0 ? texture : texture2));
		}
	}
#endif
	//Group* group = new Group(Mat4::translation(maths::Vec3(-5.0f, 5.0f, 0.0f)));
	//group->add(new Sprite(0, 0, 6, 3, maths::Vec4(1, 1, 1, 1)));
	//group->add(new Sprite(0.5f, 0.5f, 0.5f, 2.0f, maths::Vec4(1, 0, 1, 1)));
	//layer.add(group);

	GLint textIDs[] = {
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9
	};

	shader->enable();
	shader->setUniform1iv("textures", textIDs, 10);
	shader->setUniform1i("tex", 0);

	//Timer time;
	float timer = 0;
	unsigned int frames = 0;

#ifdef SPARKY_EMSCRIPTEN
	std::function<void()> mainLoop = [&]() {
#else
	while (!window.closed())
	{
#endif
		window.clear();
		double x, y;
		window.getMousePosition(x, y);
		shader->enable();
		shader->setUniform2f("light_pos", Vec2((float)(x * 32.0f / 960.0f - 16.0f), (float)(9.0f - y * 18.0f / 540.0f)));
		shader->disable();
		layer.render();

		window.update();
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

//#include <FreeImage.h>

//int main() {
//
//	const char* filename = "test.png";
//	//image format
//	FREE_IMAGE_FORMAT fif = FIF_UNKNOWN;
//	//pointer to the image, once loaded
//	FIBITMAP* dib(0);
//	//pointer to the image data
//	BYTE* bits(0);
//	//image width and height
//	unsigned int width(0), height(0);
//	//OpenGL's image ID to map to
//	GLuint gl_texID;
//
//	//check the file signature and deduce its format
//	fif = FreeImage_GetFileType(filename, 0);
//	//if still unknown, try to guess the file format from the file extension
//	if (fif == FIF_UNKNOWN)
//		fif = FreeImage_GetFIFFromFilename(filename);
//	//if still unkown, return failure
//	if (fif == FIF_UNKNOWN)
//		return false;
//
//	//check that the plugin has reading capabilities and load the file
//	if (FreeImage_FIFSupportsReading(fif))
//		dib = FreeImage_Load(fif, filename);
//	//if the image failed to load, return failure
//	if (!dib)
//		return false;
//
//	//retrieve the image data
//	bits = FreeImage_GetBits(dib);
//	unsigned int bitsPerPixel = FreeImage_GetBPP(dib);
//	unsigned int pitch = FreeImage_GetPitch(dib);
//	//get the image width and height
//	width = FreeImage_GetWidth(dib);
//	height = FreeImage_GetHeight(dib);
//	//if this somehow one of these failed (they shouldn't), return failure
//	if ((bits == 0) || (width == 0) || (height == 0))
//		return false;
//
//	for (int y = 0; y < height; y++) {
//		BYTE* pixel = (BYTE*)bits;
//
//		for (int x = 0; x < width; x++) {
//			std::cout << +pixel[FI_RGBA_RED] << " " << +pixel[FI_RGBA_GREEN] << " " << +pixel[FI_RGBA_BLUE] << std::endl;
//			pixel += 3;
//		}
//
//		bits += pitch;
//	}
//
//	std::cout << width << ", " << height << std::endl;
//
//	return 0;
//}