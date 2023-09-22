#pragma once

#include "../../../engine/graphics/renderable/bounds.h"

namespace spright
{
namespace editor
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

        // true if a layer should be created, set false when you want to set the layers after the drawing is created
        bool hasInitialLayer = true;
    };
} // namespace editor
} // namespace spright
