#pragma once

#include "../../../engine/scene/cameras/camera2d.h"
#include "../../../engine/system/window/window.h"
#include "../../../maths/data/bounds.h"
#include "../../../maths/data/bounds_int.h"
#include "../../../maths/vec2_int.h"
#include "../../../stb_image_write.h"
#include "../../document/document.h"
#include "../../editor/rendering.h"
#include "../../utils/conversions.h"
#include "./image_data.h"

#include <cstring>

namespace spright
{
namespace editing
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
} // namespace editing
} // namespace spright
