#include "services.h"


namespace spright { namespace editor {

	Services::Services()
	{
		colorPalette = new ColorPalette();
	}

	Services::~Services()
	{
		delete colorPalette;
	}

	ColorPalette* Services::getColorPalette()
	{
		return colorPalette;
	}
}}