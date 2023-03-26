#pragma once
#include <vector>
#include "checkerboard.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/shader/shader.h"
#include "../../engine/graphics/impl/gl/gl_shader.h"
#include "../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../engine/graphics/renderable/line_shape.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "../../engine/system/window/window.h"
#include "./document.h"
#include "./frame.h"
#include "./frame_impl.h"
#include "../event/event_emitter.h"

namespace spright { namespace editor {
	using namespace std;
	using namespace ::spright::engine;

	class DocumentFactory {
	private:
		Window* m_Window;
		vector<Document*> m_documents;
		EventEmitter* m_EventEmitter;
	public:
		DocumentFactory(Window* window, EventEmitter* eventEmitter);
		~DocumentFactory();
		Document* createDocument();
		void createFrame(Document* document);
		void createUserLayer(Document* document, std::string name);
	};
}}