#include "image_export.h"

namespace spright {
	ImageExport::ImageExport(Rendering* rendering) : m_Rendering(rendering)
	{
	}

	int ImageExport::exportImage(Document* document)
	{
		m_Rendering->enableImageTarget();
		document->render();
		m_Rendering->getImageTarget();

		int width = 800;
		int height = 600;
		//GLubyte* data = new GLubyte[3 * width * height];
		//memset(data, 0, 3 * width * height);
		//glReadPixels(0, 0, width, height, GL_RGB, GL_UNSIGNED_BYTE, data);

		//stbi_flip_vertically_on_write(1);
		//stbi_write_png("target.png", width, height, 3, data, width * 3);

		int res = writeImageData();

		m_Rendering->disableImageTarget();

		return res;
	}

	int ImageExport::writeImageData()
	{
		int width = 800;
		int height = 600;

		ImageData* image = new ImageData(4 * width * height);
		
		GLubyte* data = new GLubyte[4 * width * height];
		memset(data, 0, 4 * width * height);
		glReadPixels(0, 0, width, height, GL_RGBA, GL_UNSIGNED_BYTE, data);

		stbi_flip_vertically_on_write(1);
		stbi_write_png("example.png", width, height, 4, data, width * 4);
		//stbi_write_png_to_func(
		//	[](void* context, void* data, int size)
		//	{
		//		memcpy(((ImageData*)context)->data, data, size);
		//		((ImageData*)context)->size = size;
		//	}
		//, image, width, height, 3, data, width * 3);

		//m_ImageData = image;
		//this->m_ImageData = new ImageData();
		//this->m_ImageData->data = image.data;
		//this->m_ImageData->size = image.size;

		m_ImageData = image;

		return reinterpret_cast<int>(image->data);
	}

	unsigned char* ImageExport::getData() {
		return m_ImageData->data;
	}

	size_t ImageExport::getSize() {
		return m_ImageData->size;
	}
}