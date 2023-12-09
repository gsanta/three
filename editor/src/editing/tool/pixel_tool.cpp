#include "pixel_tool.h"


namespace spright
{
namespace editing
{
    PixelTool::PixelTool(string name, std::shared_ptr<Cursor> cursor) : Tool(name, cursor)
    {
    }

    PixelTool::PixelTool(string name) : Tool(name)
    {
    }

    void PixelTool::execActivate(Canvas *canvas)
    {
        TileCanvas *tileCanvas = dynamic_cast<TileCanvas *>(canvas);

        if (!tileCanvas)
        {
            throw std::invalid_argument("PixelTool needs a TileCanvas but a different Canvas was given");
        }
        m_Canvas = tileCanvas;

        activate();
    }
} // namespace editing
} // namespace spright
