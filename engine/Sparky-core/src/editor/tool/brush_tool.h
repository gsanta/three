#include "tool.h"
#include "pointer_info.h"
#include "../document/document_handler.h"
#include "../../engine/graphics/renderable/sprite.h"
#include "../editor_config.h"
#include "../editor_state.h"

namespace my_app
{
	namespace editor
	{
		namespace tool
		{
			using namespace document;

			class BrushTool : public Tool
			{
			private:
				DocumentHandler *m_documentHandler;
				EditorConfig m_EditorConfig;
				EditorState& m_editorState;
				my_app_engine::graphics::Sprite *sprite;

			public:
				BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, EditorState& editorState);

			private:
				void pointerDown(PointerInfo &pointerInfo) override;
			};
		}
	}
}
