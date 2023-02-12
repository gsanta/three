#pragma once
#include "../service/services.h"
#include "../document/document_handler.h"
#include "pointer_info.h"
#include "tool.h"

namespace spright { namespace editor {
	using namespace spright::editor;
	using namespace ::spright::engine;
	using namespace ::spright::maths;

	class ColorPickerTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		Services* m_Services;
	public:
		ColorPickerTool(DocumentHandler* documentHandler, Services* services);
		void pointerDown(PointerInfo& pointerInfo) override;
	};
}}