#include "services.h"


namespace spright_app {

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
}