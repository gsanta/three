#pragma once
#include "../../../../stb_image_write.h"
#include "../../rendering.h"
#include "../../document/document.h"
#include "../../../engine/system/window/window.h"
#include "./image_data.h"

namespace spright {

	class ImageExport {
	private:
		Rendering* m_Rendering;
		Window* m_Window;
		
		unsigned char* m_Data;
		size_t m_Size;
	
	public:
		ImageExport(Window* window, Rendering* rendering);
		~ImageExport();
		void exportImage(Document* document);
		unsigned char* getImageData();
		size_t getImageSize();
	private:
		void writeImageData();
	};
}