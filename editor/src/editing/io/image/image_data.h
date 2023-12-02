#pragma once
#include <stddef.h>

namespace spright
{
namespace editing
{
    struct ImageData
    {
        unsigned char *data;
        size_t size = 0;
        explicit ImageData(size_t size);
    };
} // namespace editing
} // namespace spright
