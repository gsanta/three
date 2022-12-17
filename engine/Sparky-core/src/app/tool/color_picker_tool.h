#pragma once
#include "../service/services.h"
#include "../document/document_handler.h"
#include "pointer_info.h"
#include "tool.h"

namespace spright_app {
	using namespace tool;
	using namespace spright_app::document;
	using namespace spright_engine::graphics;
	using namespace spright_engine::maths;

	class ColorPickerTool : public Tool {
	private:
		DocumentHandler* m_DocumentHandler;
		Services* m_Services;
	public:
		ColorPickerTool(DocumentHandler* documentHandler, Services* services);
		void pointerDown(PointerInfo& pointerInfo) override;
	};
}