#pragma once
#include <stddef.h>

namespace spright {
	struct ImageData
	{
		unsigned char* data;
		size_t size = 0;
		ImageData(size_t size);
	};
}
