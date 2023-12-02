#pragma once

#include "../../../maths/data/bounds.h"

namespace spright
{
namespace editing
{
    using namespace engine;

    struct CreateDrawingProps
    {
        inline CreateDrawingProps(const Bounds &bounds)
        {
            this->bounds = bounds;
        }

        float backgroundLayerTileSize = 2.0;

        float tileSize = 0.5f;

        float zPos = 0;
        Bounds bounds;

        bool hasCheckerBoard = true;

        size_t layerCount = 1;
    };
} // namespace editing
} // namespace spright
