#include "tool.h"
#include "pointer_info.h"
#include "../document/document_handler.h"
#include "../../engine/graphics/renderable/sprite.h"
#include "../editor_config.h"
#include "../service/editor_services.h"

namespace my_app_editor { namespace tool {
	using namespace document;

	class BrushTool : public Tool
	{
	private:
		DocumentHandler *m_documentHandler;
		EditorConfig m_EditorConfig;
		my_app_editor::EditorServices* m_Services;
		my_app_engine::graphics::Sprite *sprite;

	public:
		BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, my_app_editor::EditorServices* services);

	private:
		void pointerDown(PointerInfo &pointerInfo) override;
	};
}}
