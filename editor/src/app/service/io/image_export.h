#pragma once

#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../engine/graphics/renderable/bounds_int.h"
#include "../../../engine/system/window/window.h"
#include "../../../maths/vec2_int.h"
#include "../../../stb_image_write.h"
#include "../../document/document.h"
#include "../../rendering.h"
#include "./image_data.h"

#include <cstring>

namespace spright
{
namespace editor
{
    class ImageExport
    {
    public:
        ImageExport(Window *window, Rendering *rendering);
        ~ImageExport();
        void exportImage(Document &document);
        unsigned char *getImageData();
        size_t getImageSize();

    private:
        void writeImageData(BoundsInt bounds);

    private:
        Rendering *m_Rendering;

        Window *m_Window;

        unsigned char *m_Data = nullptr;

        size_t m_Size;
    };
} // namespace editor
} // namespace spright
