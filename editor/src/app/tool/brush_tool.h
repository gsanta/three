#pragma once
#include "tool.h"
#include "pointer_info.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../../engine/graphics/renderable/renderable2d.h"
#include "../editor_config.h"
#include "../service/services.h"
#include "../document/document_store.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;
	using namespace spright::maths;

	class BrushTool : public Tool
	{
	private:
		DocumentStore *m_documentStore;
		Services* m_Services;
		EventHandler* m_EventHandler;
		int m_Size = 1;
		Rect2D *sprite;

	public:
		BrushTool(DocumentStore* documentStore, Services* services, EventHandler* eventHandler);

		void setSize(int size);

	private:
		void pointerMove(PointerInfo& pointerInfo) override;
		void pointerDown(PointerInfo &pointerInfo) override;
		void setColor(TileLayer* tileLayer, Vec2Int tilePos);
		void draw(PointerInfo& pointerInfo);
	};
}}
