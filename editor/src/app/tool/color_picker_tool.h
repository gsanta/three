#pragma once
#include "../service/services.h"
#include "../document/document_store.h"
#include "pointer_info.h"
#include "tool.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;
	using namespace ::spright::maths;

	class ColorPickerTool : public Tool {
	private:
		DocumentStore* m_DocumentStore;
		Services* m_Services;
	public:
		ColorPickerTool(DocumentStore* documentStore, Services* services);
		void pointerDown(PointerInfo& pointerInfo) override;
	};
}}