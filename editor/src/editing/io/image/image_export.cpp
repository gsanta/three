#include "image_export.h"

namespace spright
{
namespace editing
{
    ImageExport::ImageExport(Window *window, Rendering *rendering) : m_Window(window), m_Rendering(rendering)
    {
    }

    ImageExport::~ImageExport()
    {
        if (m_Data != nullptr)
        {
            delete[] m_Data;
        }
    }

    void ImageExport::exportImage(Document &document)
    {
        TileCanvas &canvas = get_active_tile_canvas(document);

        const Bounds bounds = canvas.getBounds();

        Camera *camera = canvas.getCamera();
        Camera2d *camera2d = dynamic_cast<Camera2d *>(camera);

        camera2d->zoomToFit(canvas.getBounds());

        Vec2Int bottomLeft = camera->worldToScreenPos(bounds.minX, bounds.minY);
        Vec2Int topRight = camera->worldToScreenPos(bounds.maxX, bounds.maxY);

        const BoundsInt intBounds(bottomLeft.x, topRight.x, topRight.y, bottomLeft.y);

        m_Rendering->enableImageTarget();
        m_Rendering->render();
        writeImageData(intBounds);

        m_Rendering->enableScreenTarget();
    }

    void ImageExport::writeImageData(BoundsInt bounds)
    {
        delete[] m_Data;

        int width = bounds.getWidth();
        int height = bounds.getHeight();
        int bytes = 4 * width * height;

        ImageData *image = new ImageData(bytes);
        GLubyte *data = new GLubyte[bytes];
        memset(data, 0, bytes);

        glReadPixels(bounds.minX, bounds.minY, width, height, GL_RGBA, GL_UNSIGNED_BYTE, data);

        stbi_flip_vertically_on_write(1);
        stbi_write_png_to_func(
            [](void *context, void *data, int size) {
                memcpy(static_cast<ImageData *>(context)->data, data, size);
                static_cast<ImageData *>(context)->size = size;
            },
            image,
            width,
            height,
            4,
            data,
            width * 4);

        m_Size = image->size;
        m_Data = image->data;
    }

    unsigned char *ImageExport::getImageData()
    {
        return m_Data;
    }

    size_t ImageExport::getImageSize()
    {
        return m_Size;
    }
} // namespace editing
} // namespace spright
