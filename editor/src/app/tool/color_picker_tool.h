#pragma once
#include "../service/services.h"
#include "../document/document_store.h"
#include "pointer_info.h"
#include "tool.h"
#include "helper/layer_provider.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;
	using namespace ::spright::maths;

	class ColorPickerTool : public Tool {
	private:
		LayerProvider* m_LayerProvider;
		EventHandler* m_EventHandler;
		unsigned int m_PickedColor;

	public:
		ColorPickerTool(LayerProvider* layerProvider, EventHandler* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		unsigned int getPickedColor() const;

	private:
		void emitColorChange() const;
	};
}}