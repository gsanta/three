#pragma once
#include "../service/services.h"
#include "../document/document_handler.h"
#include "pointer_info.h"
#include "tool.h"

namespace spright {
	using namespace tool;
	using namespace spright::document;
	using namespace engine::graphics;
	using namespace engine::maths;

	class ColorPickerTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		Services* m_Services;
	public:
		ColorPickerTool(DocumentHandler* documentHandler, Services* services);
		void pointerDown(PointerInfo& pointerInfo) override;
	};
}