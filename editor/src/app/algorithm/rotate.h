#pragma once

#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/renderable/rect2d.h"
#include "../document/factory/document_factory.h"
#include "../tool/select_tool/rect_selector.h"
#include "./tile_operations.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    void rotate(TileLayer &source, DocumentFactory *documentFactory, const BoundsInt &bounds, float angle);
} // namespace editor
} // namespace spright
