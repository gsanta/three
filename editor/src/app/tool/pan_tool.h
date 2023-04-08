#pragma once

#include "tool.h"
#include "../../engine/graphics/camera/ortho_projection_info.h"
#include "pointer_info.h"
#include "../document/document_store.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;

	class PanTool : public Tool
	{
	private:
		DocumentStore* m_DocumentStore;
		float m_ZoomFactor = 1.0f;

	public:
		PanTool(DocumentStore* documentStore);
	private:
		void pointerMove(PointerInfo& pointerInfo) override;
	};
}}
