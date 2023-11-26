#pragma once
#include "../../engine/graphics/layer/tile_layer.h"

#include <nlohmann/json.hpp>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace engine;

    class Frame
    {
    private:
        size_t m_Index;

    protected:
        std::vector<TileLayer> m_Layers;

    public:
        Frame();

        Frame(size_t index);

        Frame(const Frame &);

        bool isEqual(const Frame &) const;

        TileLayer &addLayer(const TileLayer &tileLayer);

        void insertLayer(const TileLayer &tileLayer, size_t index);

        void removeLayer(size_t layerIndex);

        void changeLayerOrder(size_t oldOrder, size_t newOrder);

        TileLayer &getLayer(size_t index);

        std::vector<TileLayer> &getLayers();

        const std::vector<TileLayer> &getLayers() const;

        size_t getIndex() const;

        void setIndex(size_t index);

        nlohmann::json getJson() const;

        friend bool operator==(const Frame &, const Frame &);

        friend bool operator!=(const Frame &, const Frame &);

    private:
        void resetLayerIndexes();
    };

    TileLayer &find_layer(std::string id, std::vector<TileLayer> &layers);
} // namespace editor
} // namespace spright
