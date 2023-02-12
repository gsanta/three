#pragma once
#include "color_palette.h"
#include "core/event/event_handler.h"
#include "emscripten/em_service.h"

namespace spright { namespace editor {

	class Services {
	private:
		ColorPalette* colorPalette;
		EventHandler* eventHandler;
		EmService* m_EmService;

	public:
		Services();
		~Services();
		ColorPalette* getColorPalette();
		EventHandler* getEventHandler();
		EmService* getEmService();
		void setEmService(EmService* emService);
	};
}}