#include "editor_services.h"


namespace my_app_editor {

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