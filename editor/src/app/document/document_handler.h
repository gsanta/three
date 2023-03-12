#pragma once
#include <vector>
#include "checkerboard.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/layer/dimensions.h"
#include "../../engine/graphics/shader/shader.h"
#include "../../engine/graphics/impl/gl/gl_shader.h"
#include "../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../engine/graphics/renderable/line_shape.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/system/window/window.h"
#include "./document.h"
#include "./frame.h"
#include "./frame_impl.h"

namespace spright { namespace editor {
	using namespace std;
	using namespace ::spright::engine;

	class DocumentHandler {
	private:
		Window* m_Window;
		vector<Document*> m_documents;
	public:
		DocumentHandler(Window* window);
		~DocumentHandler();
		Document* createDocument();
		TileLayer& createUserLayer(Document* document, std::string name, std::string id);
	};
}}