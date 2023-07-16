#pragma once

#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "./factory/document_factory.h"
#include "drawing.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    Drawing resize_drawing(const Drawing &orig, const Bounds &bounds, DocumentFactory *documentFactory);

} // namespace editor
} // namespace spright
