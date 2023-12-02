#include "image_data.h"

namespace spright
{
namespace editing
{

    ImageData::ImageData(size_t size) : data(new unsigned char[size]), size(size)
    {
    }
} // namespace editing
} // namespace spright
