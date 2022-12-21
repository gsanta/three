#pragma once
#include <vector>
#include "document.h"
#include "checkerboard.h"
#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/layer/dimensions.h"
#include "../../engine/graphics/shader/shader.h"
#include "../../engine/graphics/renderer/batchRenderer2d.h"
#include "../../engine/graphics/renderable/line_shape.h"
#include "../../engine/graphics/renderable/sprite.h"

namespace spright { namespace document {
	using namespace std;
	using namespace engine::graphics;

	class DocumentHandler {
	private:
		vector<Document*> m_documents;
		Document* m_ActiveDocument = nullptr;
	public:
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