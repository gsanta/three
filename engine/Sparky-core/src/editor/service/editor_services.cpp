#include "editor_services.h"


namespace spright_app {

	EditorServices::EditorServices()
	{
		colorPalette = new ColorPalette();
	}

	EditorServices::~EditorServices()
	{
		delete colorPalette;
	}

	ColorPalette* EditorServices::getColorPalette()
	{
		return colorPalette;
	}
}