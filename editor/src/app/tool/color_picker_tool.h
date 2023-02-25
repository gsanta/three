#pragma once
#include "../service/services.h"
#include "../document/document_store.h"
#include "pointer_info.h"
#include "tool.h"
#include "helper/layer_provider.h"
#include "../service/core/event/event_emitter.h"

namespace spright { namespace editor {
	using namespace ::spright::engine;
	using namespace ::spright::maths;

	class ColorPickerTool : public Tool {
	private:
		LayerProvider* m_LayerProvider;
		EventEmitter* m_EventEmitter;
		unsigned int m_PickedColor;

	public:
		ColorPickerTool(LayerProvider* layerProvider, EventEmitter* eventHandler);
		void pointerDown(PointerInfo& pointerInfo) override;
		unsigned int getPickedColor() const;
		std::string getData();

	private:
		void emitColorChange() const;
	};
}}