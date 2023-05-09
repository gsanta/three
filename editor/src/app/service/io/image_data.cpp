#include "image_data.h"

namespace spright
{
namespace editor
{

    ImageData::ImageData(size_t size) : data(new unsigned char[size]), size(size)
    {
    }
} // namespace editor
} // namespace spright