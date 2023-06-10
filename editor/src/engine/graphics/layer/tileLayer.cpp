#include "tileLayer.h"

namespace spright
{
namespace engine
{

    const float TileLayer::defaultTileSize = 0.5f;

    TileLayer::TileLayer(std::string name, Group<Rect2D> group, Bounds bounds, float tileSize, float zPos)
        : m_Group(group), m_TileSize(tileSize), m_Name(name), m_Bounds(bounds), m_ZPos(zPos)
    {

        init();
    }

    TileLayer::TileLayer(const TileLayer &tileLayer)
        : m_Index(tileLayer.m_Index), m_Name(tileLayer.m_Name),
          m_Group(Group<Rect2D>(tileLayer.m_Group.getRenderer()->clone())), m_Bounds(tileLayer.m_Bounds),
          m_TileSize(tileLayer.m_TileSize), m_ZPos(tileLayer.m_ZPos)
    {

        init();
        copyGroup(tileLayer.m_Group);
    }


    TileLayer::~TileLayer()
    {
        delete[] m_TileIndexes;
    }

    TileLayer &TileLayer::operator=(const TileLayer &that)
    {
        if (this != &that)
        {
            m_Index = that.m_Index;
            m_Name = that.m_Name;
            m_Bounds = that.m_Bounds;
            m_TileSize = that.m_TileSize;
            m_ZPos = that.m_ZPos;

            m_Group.clear();
            delete[] m_TileIndexes;

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
        Rect2D &newRect = m_Group.add(rect);

        Vec2 pos = newRect.getBounds().getCenter();
        Vec2Int tilePos = getTilePos(pos);

        int index = m_TileBounds.getWidth() * tilePos.y + tilePos.x;
        if (m_IndexSize > index)
        {
            m_TileIndexes[index] = &newRect;
            newRect.setTileIndex(index);
        }

        return newRect;
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
            m_Group.render(camera);
        }
    }

    std::vector<Rect2D *> &TileLayer::getRenderables()
    {
        return m_Group.getRenderables();
    }

    const std::vector<Rect2D *> &TileLayer::getRenderables() const
    {
        return m_Group.getRenderables();
    }

    Vec2 TileLayer::getBottomLeftPos(Vec2 pointer) const
    {
        Vec2Int tilePos = getTilePos(pointer);
        float tileSize = m_TileSize;

        float x = static_cast<float>(tilePos.x) * tileSize + m_Bounds.minX + m_TileSize / 2;
        float y = static_cast<float>(tilePos.y) * tileSize + m_Bounds.minY + m_TileSize / 2;

        return Vec2(x, y);
    }

    Vec2 TileLayer::getBottomLeftPos(int tileIndex) const
    {
        int y = tileIndex / m_TileBounds.getWidth();
        int x = tileIndex % m_TileBounds.getWidth();
        return Vec2(x * m_TileSize + m_Bounds.minX + m_TileSize / 2, y * m_TileSize + m_Bounds.minY + m_TileSize / 2);
    }

    Vec2 TileLayer::getWorldPos(int tileIndex) const
    {
        return getBottomLeftPos(tileIndex);
    }

    Vec2 TileLayer::getWorldPos(const Vec2Int tilePos) const
    {
        return getWorldPos(getTileIndex(tilePos.x, tilePos.y));
    }

    // TODO: check if it works for both even and odd number of tiles
    Vec2Int TileLayer::getTilePos(Vec2 pos) const
    {
        Vec2 adjustedPos(pos.x - m_Bounds.minX, pos.y - m_Bounds.minY);
        float tileSize = m_TileSize;
        int tileX = (int)(adjustedPos.x / tileSize);

        int tileY = (int)(adjustedPos.y / tileSize);

        return Vec2Int(tileX, tileY);
    }

    Vec2Int TileLayer::getTilePos(int tileIndex) const
    {
        return Vec2Int(getColumn(tileIndex), getRow(tileIndex));
    }

    unsigned int TileLayer::getColumn(int tileIndex) const
    {
        return tileIndex % m_TileBounds.getWidth();
    }

    unsigned int TileLayer::getRow(int tileIndex) const
    {
        return tileIndex / m_TileBounds.getWidth();
    }

    Vec2 TileLayer::getWorldPos(int x, int y)
    {
        return getWorldPos(Vec2Int(x, y));
    }

    void TileLayer::translateTile(Rect2D *tile, const Vec2 &delta)
    {
        tile->translate(delta);

        Vec2Int tilePos = getTilePos(tile->getPosition2d());
        int newTileIndex = getTileIndex(tilePos.x, tilePos.y);
        updateTileIndex(tile, newTileIndex);
    }

    void TileLayer::setTilePos(Rect2D *tile, const Vec2Int &newPos)
    {
        tile->setPosition(getWorldPos(newPos));

        int newTileIndex = getTileIndex(newPos.x, newPos.y);
        updateTileIndex(tile, newTileIndex);
    }

    int TileLayer::getTileIndex(int tileX, int tileY) const
    {
        return m_TileBounds.getWidth() * tileY + tileX;
    }

    int TileLayer::getTileIndex(Vec2 worldPos) const
    {
        Vec2Int tilePos = getTilePos(worldPos);

        return getTileIndex(tilePos.x, tilePos.y);
    }

    const BoundsInt &TileLayer::getTileBounds() const
    {
        return m_TileBounds;
    }

    Rect2D *TileLayer::getAtTileIndex(int tilePos) const
    {
        return static_cast<Rect2D *>(m_TileIndexes[tilePos]);
    }

    Rect2D *TileLayer::getAtTilePos(int x, int y) const
    {
        return getAtTileIndex(getTileIndex(x, y));
    }

    Rect2D *TileLayer::getAtWorldPos(Vec2 pos) const
    {
        return getAtTileIndex(getTileIndex(pos));
    }

    int TileLayer::getIndexSize() const
    {
        return m_IndexSize;
    }

    nlohmann::json TileLayer::getLayerDescription() const
    {
        nlohmann::json json = {
            {"index", m_Index},
            {"name", m_Name},
        };

        return json;
    }

    const Bounds &TileLayer::getBounds() const
    {
        return m_Bounds;
    }

    nlohmann::json TileLayer::getJson() const
    {
        nlohmann::json json;

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
        int width = ceil((m_Bounds.maxX - m_Bounds.minX) / m_TileSize);
        int height = ceil((m_Bounds.maxY - m_Bounds.minY) / m_TileSize);
        int left = (m_Bounds.minX / m_TileSize) - 1;
        int bottom = (m_Bounds.minY / m_TileSize) - 1;

        m_TileBounds = BoundsInt(left, left + width, bottom, bottom + height);

        m_IndexSize = width * height;
        m_TileIndexes = new Renderable2D *[m_IndexSize]();
        Mat4 transformation = Mat4::translation(Vec3(0, 0, m_ZPos));
        m_Group.getRenderer()->push(transformation);
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
