#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/layer/tile_view.h"
#include "../../algorithm/tile_operations.h"
#include "../context/tool_context.h"
#include "../tools/select_tool/selection_buffer.h"

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

        void clear();

        const std::vector<int> &getOriginalSelectedIndexes() const;

        const BoundsInt &getSavedArea();

        const TileView &getTileView();

    private:
        std::unique_ptr<TileView> m_TileView;

        BoundsInt m_SavedArea;

        std::vector<int> m_ImpactedIndexes;

        std::vector<int> m_OriginalSelectedIndexes;
    };
} // namespace editor
} // namespace spright
