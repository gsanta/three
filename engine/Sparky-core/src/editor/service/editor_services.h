#pragma once
#include "color_palette.h"

namespace my_app_editor {

	class EditorServices {
	private:
		ColorPalette* colorPalette;

	public:
		EditorServices();
		~EditorServices();
		ColorPalette* getColorPalette();
	};
}