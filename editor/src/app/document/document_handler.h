#pragma once
#include <vector>
#include "checkerboard.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/layer/dimensions.h"
#include "../../engine/graphics/shader/shader.h"
#include "../../engine/graphics/impl/gl/gl_shader.h"
#include "../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../engine/graphics/renderable/line_shape.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/system/window/window.h"
#include "./document.h"

namespace spright { namespace editor {
	using namespace std;
	using namespace ::spright::engine;

	class DocumentHandler {
	private:
		Window* m_Window;
		vector<Document*> m_documents;
		Document* m_ActiveDocument = nullptr;
	public:
		DocumentHandler(Window* window);
		~DocumentHandler();
		void createDocument();
		void createUserLayer(std::string name, std::string id);
		inline Document* getActiveDocument() const {
			return m_ActiveDocument;
		}

		inline bool hasActiveDocument() const {
			return m_ActiveDocument != nullptr;
		}
	};
}}