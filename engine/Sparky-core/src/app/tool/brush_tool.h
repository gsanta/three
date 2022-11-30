#include "tool.h"
#include "pointer_info.h"
#include "../document/document_handler.h"
#include "../../engine/graphics/renderable/sprite.h"
#include "../editor_config.h"
#include "../service/services.h"

namespace spright_app { namespace tool {
	using namespace document;

	class BrushTool : public Tool
	{
	private:
		DocumentHandler *m_documentHandler;
		EditorConfig m_EditorConfig;
		spright_app::Services* m_Services;
		EventHandler* m_EventHandler;
		int m_Size = 2;
		spright_engine::graphics::Sprite *sprite;

	public:
		BrushTool(DocumentHandler *documentHandler, EditorConfig &editorConfig, spright_app::Services* services, EventHandler* eventHandler);

		void setSize(int size);

	private:
		void pointerDown(PointerInfo &pointerInfo) override;
	};
}}
