#include "image_export.h"

namespace spright {
	ImageExport::ImageExport(Window* window, Rendering* rendering) : m_Window(window), m_Rendering(rendering)
	{
	}

	ImageExport::~ImageExport() {
		if (m_Data != nullptr) {
			delete[] m_Data;
		}
	}

	void ImageExport::exportImage(Document* document)
	{
		m_Rendering->enableImageTarget();
		document->render();
		m_Rendering->getImageTarget();

		int width = m_Window->getWidth();
		int height = m_Window->getHeight();

		writeImageData();

		m_Rendering->disableImageTarget();
	}

	void ImageExport::writeImageData()
	{
		if (m_Data != nullptr) {
			delete[] m_Data;
		}

		int width = m_Window->getWidth();
		int height = m_Window->getHeight();

		ImageData* image = new ImageData(4 * width * height);
		
		GLubyte* data = new GLubyte[4 * width * height];
		memset(data, 0, 4 * width * height);
		glReadPixels(0, 0, width, height, GL_RGBA, GL_UNSIGNED_BYTE, data);

		stbi_flip_vertically_on_write(1);
		stbi_write_png_to_func(
			[](void* context, void* data, int size)
			{
				memcpy(((ImageData*)context)->data, data, size);
				((ImageData*)context)->size = size;
			}
		, image, width, height, 4, data, width * 4);

		m_Size = image->size;
		m_Data = image->data;
	}

	unsigned char* ImageExport::getImageData() {
		return m_Data;
	}

	size_t ImageExport::getImageSize() {
		return m_Size;
	}
}