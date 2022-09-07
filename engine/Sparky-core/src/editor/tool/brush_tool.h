#include "tool.h"
#include "../document/document_handler.h"
#include "../../graphics/sprite.h"

namespace my_app { namespace editor { namespace tool {
	using namespace document;

	class BrushTool : public Tool {
	private:
		DocumentHandler* m_documentHandler;

	public:
		BrushTool(DocumentHandler* documentHandler);

	private: 
		void pointerDown() override;
	};
} } }
