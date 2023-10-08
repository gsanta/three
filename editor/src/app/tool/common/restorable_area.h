#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/layer/tile_view.h"
#include "../../algorithm/tile_operations.h"
#include "../select_tool/selection_buffer.h"
#include "../tool/tool_context.h"

#include <memory>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace engine;

    /*
     * Can be used by tools that executes an action on the original shape multiple times on pointer move
     */
    class RestorableArea
    {
    public:
        void saveArea(const TileLayer &activeLayer,
                      const std::vector<int> &originalSelectedIndexes,
                      const BoundsInt &area);

        void restoreArea(TileLayer &activeLayer, const SelectionBuffer &selectionBuffer);

        const std::vector<int> &getOriginalSelectedIndexes() const;

    private:
        std::unique_ptr<TileView> m_ImpactedTiles;

        std::vector<int> m_ImpactedIndexes;

        std::vector<int> m_OriginalSelectedIndexes;
    };
} // namespace editor
} // namespace spright
