#pragma once
#include <vector>
#include "document.h"
#include "../../graphics/layers/tileLayer.h"
#include "../../graphics/shader.h"
#include "../../graphics/batchRenderer2d.h"
#include "../../graphics/renderable/line_shape.h"
#include "../../graphics/sprite.h"

namespace my_app { namespace editor { namespace document {
	using namespace std;

	class DocumentHandler {
	private:
		vector<Document*> m_documents;
		Document* m_ActiveDocument = nullptr;
	public:
		~DocumentHandler();
		void createDocument();
		inline Document* getActiveDocument() const {
			return m_ActiveDocument;
		}

		inline bool hasActiveDocument() const {
			return m_ActiveDocument != nullptr;
		}
	};
}}}