#include "image_data.h"

namespace spright {

	ImageData::ImageData(size_t size) {
		data = new unsigned char[size];
		this->size = size;
	}
}