#pragma once
#include "color_palette.h"

namespace spright_app {

	class EditorServices {
	private:
		ColorPalette* colorPalette;

	public:
		EditorServices();
		~EditorServices();
		ColorPalette* getColorPalette();
	};
}