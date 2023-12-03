#pragma once

#include "../../document/document.h"

namespace spright
{
namespace editing
{
    template <typename C>
    struct DocInfo
    {
        DocInfo(C *canvas);

        Document *document = nullptr;

        C &getCanvas();

    private:
        C *m_Canvas = nullptr;
    };


    template <typename C>
    DocInfo::DocInfo(C *canvas) : m_Canvas(canvas)
    {
    }

    template <typename C>
    C &DocInfo::getCanvas()
    {
        return *m_Canvas;
    }

} // namespace editing
} // namespace spright
