#pragma once
#include "color_palette.h"

namespace spright { namespace editor {

	class Services {
	private:
		ColorPalette* colorPalette;

	public:
		Services();
		~Services();
		ColorPalette* getColorPalette();
	};
}}