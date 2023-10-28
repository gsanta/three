#pragma once

#include "../../engine/graphics/layer/tile_layer.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "./factory/document_factory.h"
#include "drawing.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    Drawing resize_drawing(const Drawing &orig, const Bounds &bounds, const DocumentFactory &documentFactory);

} // namespace editor
} // namespace spright
