#pragma once

#include "../../engine/scene/canvas/tile_canvas.h"
#include "../../engine/scene/containers/tile_layer.h"
#include "../../maths/data/bounds.h"
#include "./factory/document_factory.h"

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    Drawing resize_drawing(const Drawing &orig, const Bounds &bounds, const DocumentFactory &documentFactory);

} // namespace editing
} // namespace spright
