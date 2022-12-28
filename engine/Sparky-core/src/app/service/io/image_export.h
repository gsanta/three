#pragma once
#include "../../../../stb_image_write.h"
#include "../../rendering.h"
#include "../../document/document.h"
#include "./image_data.h"

namespace spright {

	class ImageExport {
	private:
		Rendering* m_Rendering;
		ImageData* m_ImageData;
	public:
		ImageExport(Rendering* rendering);
		int exportImage(Document* document);
		unsigned char* getData();
		size_t getSize();
		ImageData* getImageData();
	private:
		int writeImageData();
	};
}