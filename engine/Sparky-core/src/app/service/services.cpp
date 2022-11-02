#include "services.h"


namespace spright_app {

	Services::Services()
	{
		colorPalette = new ColorPalette();
		eventHandler = new EventHandler();
	}

	Services::~Services()
	{
		delete colorPalette;
		delete m_EmService;
		delete eventHandler;
	}

	ColorPalette* Services::getColorPalette()
	{
		return colorPalette;
	}

	EventHandler* Services::getEventHandler() {
		return eventHandler;
	}

	EmService* Services::getEmService()
	{
		return m_EmService;
	}

	void Services::setEmService(EmService* emService)
	{
		m_EmService = emService;
	}
}