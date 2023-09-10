#include "tileLayer.h"

namespace spright
{
namespace engine
{

    const float TileLayer::defaultTileSize = 0.5f;

    TileLayer::TileLayer(std::string name,
                         const Renderer2D &renderer,
                         Group<Rect2D> group,
                         Bounds bounds,
                         float tileSize,
                         float zPos,
                         bool allowDuplicatedPixels)
        : TileView(bounds, tileSize), m_Name(name), m_Renderer(renderer.clone()), m_ZPos(zPos),
          m_AllowDuplicatedPixels(allowDuplicatedPixels)
    {
        init();
    }

    TileLayer::TileLayer(const TileLayer &tileLayer)
        : TileView(tileLayer), m_Index(tileLayer.m_Index), m_Name(tileLayer.m_Name),
          m_Renderer(tileLayer.m_Renderer->clone()), m_ZPos(tileLayer.m_ZPos),
          m_AllowDuplicatedPixels(tileLayer.m_AllowDuplicatedPixels)
    {

        init();
        copyGroup(tileLayer.m_Group);
    }

    TileLayer &TileLayer::operator=(const TileLayer &that)
    {
        if (this != &that)
        {
            TileView::operator=(that);

            m_Index = that.m_Index;
            m_Name = that.m_Name;
            m_Bounds = that.m_Bounds;
            m_TileSize = that.m_TileSize;
            m_ZPos = that.m_ZPos;
            m_AllowDuplicatedPixels = that.m_AllowDuplicatedPixels;

            init();
            copyGroup(that.m_Group);
        }

        return *this;
    }

    bool operator==(const TileLayer &lhs, const TileLayer &rhs)
    {
        return lhs.m_Name == rhs.m_Name && lhs.m_Bounds == rhs.m_Bounds && lhs.m_Group == rhs.m_Group &&
               lhs.m_TileSize == rhs.m_TileSize && lhs.m_IndexSize == rhs.m_IndexSize;
    }

    bool operator!=(const TileLayer &lhs, const TileLayer &rhs)
    {
        return !(lhs == rhs);
    }

    void TileLayer::setIndex(size_t index)
    {
        m_Index = index;
    }

    size_t TileLayer::getIndex() const
    {
        return m_Index;
    }

    std::string TileLayer::getName() const
    {
        return m_Name;
    }

    void TileLayer::setEnabled(bool isEnabled)
    {
        m_IsEnabled = isEnabled;
    }

    bool TileLayer::isEnabled()
    {
        return m_IsEnabled;
    }

    Rect2D &TileLayer::add(const Rect2D &rect)
    {
        Vec2 pos = rect.getBounds().getCenter();
        Vec2Int tilePos = getTilePos(pos);
        int tileIndex = m_TileBounds.getWidth() * tilePos.y + tilePos.x;

        if (!m_AllowDuplicatedPixels && getAtTileIndex(tileIndex))
        {
            remove(*getAtTileIndex(tileIndex));
        }

        Rect2D &newRect = m_Group.add(rect);

        m_TileIndexes[tileIndex] = &newRect;
        newRect.setTileIndex(tileIndex);

        return newRect;
    }

    Rect2D &TileLayer::add(const Rect2D &rect, const Vec2Int &tilePos)
    {
        Rect2D newRect(rect);
        newRect.setCenterPosition(TileView::getWorldPos(tilePos));
        return add(newRect);
    }

    void TileLayer::remove(const Rect2D &rect)
    {
        Vec2 pos = rect.getBounds().getCenter();
        Vec2Int tilePos = getTilePos(pos);

        int index = m_TileBounds.getWidth() * tilePos.y + tilePos.x;

        m_TileIndexes[index] = nullptr;

        m_Group.remove(rect);
    }

    void TileLayer::clear()
    {
        m_Group.clear();
        delete[] m_TileIndexes;
        m_TileIndexes = new Renderable2D *[m_IndexSize]();
    }

    void TileLayer::render(const Camera &camera)
    {
        if (m_IsEnabled)
        {
            m_Group.render(camera, *m_Renderer.get());
        }
    }

    Vec2 TileLayer::getWorldPos(int x, int y)
    {
        return TileView::getWorldPos(Vec2Int(x, y));
    }

    void TileLayer::translateTile(Rect2D *tile, const Vec2 &delta)
    {
        tile->translate(delta);

        Vec2Int tilePos = getTilePos(tile->getPosition2d());
        int newTileIndex = TileView::getTileIndex(tilePos.x, tilePos.y);
        updateTileIndex(tile, newTileIndex);
    }

    void TileLayer::setTilePos(Rect2D *tile, const Vec2Int &newPos)
    {
        Vec2 halfTileSize(getTileSize() / 2.0f);
        tile->setPosition(TileView::getWorldPos(newPos) - halfTileSize);

        int newTileIndex = TileView::getTileIndex(newPos.x, newPos.y);
        updateTileIndex(tile, newTileIndex);
    }

    int TileLayer::getTileIndex(Vec2 worldPos) const
    {
        Vec2Int tilePos = getTilePos(worldPos);

        return TileView::getTileIndex(tilePos.x, tilePos.y);
    }

    bool TileLayer::containsTile(int x, int y) const
    {
        return 0 <= x && x < getTileBounds().getWidth() && 0 <= y && getTileBounds().getHeight() > y;
    }

    Rect2D *TileLayer::getAtWorldPos(Vec2 pos) const
    {
        return getAtTileIndex(getTileIndex(pos));
    }

    int TileLayer::getIndexSize() const
    {
        return m_IndexSize;
    }

    float TileLayer::getZPos() const
    {
        return m_ZPos;
    }

    nlohmann::json TileLayer::getLayerDescription() const
    {
        nlohmann::json json = {
            {"index", m_Index},
            {"name", m_Name},
        };

        return json;
    }

    nlohmann::json TileLayer::getJson() const
    {
        nlohmann::json json = {{"tiles", nlohmann::json::array()}};

        for (Renderable2D *renderable : m_Group.getRenderables())
        {
            json["tiles"] += renderable->getJson();
        }

        return json;
    }

    void TileLayer::setJson(std::string json)
    {
        nlohmann::json parsedJson = nlohmann::json::parse(json);

        this->clear();

        for (nlohmann::json j : parsedJson)
        {
            float posX = j["posX"];
            float posY = j["posY"];
            float posZ = j["posZ"];
            float sizeX = j["sizeX"];
            float sizeY = j["sizeY"];

            add(Rect2D(posX, posY, sizeX, sizeY, 0xff0000ff));
        }
    }

    void TileLayer::init()
    {
        Mat4 transformation = Mat4::translation(Vec3(0, 0, m_ZPos));
        m_Renderer->push(transformation);
    }

    void TileLayer::copyGroup(const Group<Rect2D> &group)
    {
        for (const Rect2D *rect : group.getRenderables())
        {
            add(*rect);
        }
    }

    void TileLayer::updateTileIndex(Rect2D *rect, int newIndex)
    {
        if (m_TileIndexes[rect->getTileIndex()] == rect)
        {
            m_TileIndexes[rect->getTileIndex()] = nullptr;
        }
        rect->setTileIndex(newIndex);
        m_TileIndexes[newIndex] = rect;
    }

} // namespace engine
} // namespace spright
