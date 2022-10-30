#pragma once
#include "color_palette.h"

namespace spright_app {

	class Services {
	private:
		ColorPalette* colorPalette;

	public:
		Services();
		~Services();
		ColorPalette* getColorPalette();
	};
}