#include "tileLayer.h"

namespace spright { namespace engine {

	TileLayer::TileLayer(std::string name, std::string id, Group<Rect2D> group, Container* container, float tileSize)
		: m_Group(group), m_TileSize(tileSize), m_Name(name), m_Id(id), m_Container(container) {
	
		init();
	}

	TileLayer::TileLayer(const TileLayer& tileLayer)
		: m_Id(tileLayer.m_Id), m_Name(tileLayer.m_Name), m_Group(tileLayer.m_Group), m_Container(tileLayer.m_Container), m_TileSize(tileLayer.m_TileSize) {

		init();
	}


	TileLayer::~TileLayer() {
		delete[] m_TileIndexes;
	}

	TileLayer& TileLayer::operator=(const TileLayer& that) {
		if (this != &that) {
			m_Id = that.m_Id;
			m_Name = that.m_Name;
			m_Group = that.m_Group;
			m_Container = that.m_Container;
			m_TileSize = that.m_TileSize;

			init();
		}

		return *this;
	}

	std::string TileLayer::getId() {
		return m_Id;
	}

	void TileLayer::setEnabled(bool isEnabled) {
		m_IsEnabled = isEnabled;
	}

	bool TileLayer::isEnabled() {
		return m_IsEnabled;
	}

	Rect2D& TileLayer::add(const Rect2D& rect)
	{
		Rect2D& newRect = m_Group.add(rect);

		Vec2 pos = newRect.getBounds().getCenter();
		Vec2Int tilePos = getTilePos(pos);

		int index = m_TileBounds.getWidth() * tilePos.y + tilePos.x;
		if (m_IndexSize > index) {
			m_TileIndexes[index] = &newRect;
			newRect.setTileIndex(index);
		}

		return newRect;
	}

	void TileLayer::remove(const Rect2D& rect) {
		Vec2 pos = rect.getBounds().getCenter();
		Vec2Int tilePos = getTilePos(pos);

		int index = m_TileBounds.getWidth() * tilePos.y + tilePos.x;

		m_TileIndexes[index] = nullptr;

		m_Group.remove(rect);
	}
	
	// TODO: fix clear to remove from m_TileIndexes
	void TileLayer::clear() {
		m_Group.clear();
	}
	
	void TileLayer::render(Camera* camera) {
		if (m_IsEnabled) {
			m_Group.render(camera);
		}
	}

	std::vector<Rect2D*>& TileLayer::getRenderables() {
		return m_Group.getRenderables();
	}

	Vec2 TileLayer::getBottomLeftPos(Vec2 pointer) const
	{
		Vec2Int tilePos = getTilePos(pointer);
		float tileSize = m_TileSize;
		Dimensions dimensions = m_Container->getDimensions();

		float x = static_cast<float>(tilePos.x) * tileSize + dimensions.left;
		float y = static_cast<float>(tilePos.y) * tileSize + dimensions.bottom;

		return Vec2(x, y);
	}

	Vec2 TileLayer::getBottomLeftPos(int tileIndex) const
	{
		int y = tileIndex / m_TileBounds.getWidth();
		int x = tileIndex % m_TileBounds.getWidth();
		Dimensions dimensions = m_Container->getDimensions();

		return Vec2(x * m_TileSize + dimensions.left, y * m_TileSize + dimensions.bottom);
	}

	Vec2 TileLayer::getWorldPos(int tileIndex) const {
		Vec2 bottomLeftPos = getBottomLeftPos(tileIndex);
		bottomLeftPos.x += m_TileSize / 2.0f;
		bottomLeftPos.y += m_TileSize / 2.0f;

		return bottomLeftPos;
	}

	Vec2 TileLayer::getWorldPos(const Vec2Int tilePos) const {
		return getWorldPos(getTileIndex(tilePos.x, tilePos.y));
	}

	// TODO: check if it works for both even and odd number of tiles
	Vec2Int TileLayer::getTilePos(Vec2 pos) const {
		Dimensions dimensions = m_Container->getDimensions();

		Vec2 adjustedPos(pos.x - dimensions.left, pos.y - dimensions.bottom);
		float tileSize = m_TileSize;
		int tileX = (int)(adjustedPos.x / tileSize);

		int tileY = (int)(adjustedPos.y / tileSize);

		return Vec2Int(tileX, tileY);
	}

	Vec2Int TileLayer::getTilePos(int tileIndex) const {
		return Vec2Int(getColumn(tileIndex), getRow(tileIndex));
	}

	unsigned int TileLayer::getColumn(int tileIndex) const {
		return tileIndex % m_TileBounds.getWidth();
	}
	
	unsigned int TileLayer::getRow(int tileIndex) const {
		return tileIndex / m_TileBounds.getWidth();
	}

	Vec2 TileLayer::getWorldPos(int x, int y)
	{
		Dimensions dimensions = m_Container->getDimensions();

		float tileSize = m_TileSize;

		float worldX = x * tileSize + tileSize / 2 + dimensions.left;
		float worldY = y * tileSize + tileSize / 2 + dimensions.bottom;

		return Vec2(worldX, worldY);
	}

	void TileLayer::updateTileIndex(int oldIndex, int newIndex) {
		Rect2D* sprite = dynamic_cast<Rect2D*>(getAtTileIndex(oldIndex));
		sprite->setTileIndex(newIndex);
		m_TileIndexes[oldIndex] = nullptr;
		m_TileIndexes[newIndex] = sprite;
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

	const BoundsInt& TileLayer::getTileBounds() const
	{
		return m_TileBounds;
	}

	Rect2D* TileLayer::getAtTileIndex(int tilePos) const
	{
		return static_cast<Rect2D*>(m_TileIndexes[tilePos]);
	}

	Rect2D* TileLayer::getAtTilePos(const Vec2Int& tilePos) const
	{
		return getAtTileIndex(getTileIndex(tilePos.x, tilePos.y));
	}

	int TileLayer::getIndexSize() const {
		return m_IndexSize;
	}

	nlohmann::json TileLayer::getLayerDescription() {
		nlohmann::json json = {
			{"id", m_Id},
			{"name", m_Name},
		};

		return json;
	}

	nlohmann::json TileLayer::getJson()
	{
		nlohmann::json json;

		for (Renderable2D* renderable : m_Group.getRenderables()) {
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

	void TileLayer::init() {
		Dimensions dimensions = m_Container->getDimensions();

		int width = (dimensions.right - dimensions.left) / m_TileSize;
		int height = (dimensions.top - dimensions.bottom) / m_TileSize;
		int left = (dimensions.left / m_TileSize) - 1;
		int bottom = (dimensions.bottom / m_TileSize) - 1;

		m_TileBounds = BoundsInt(left, left + width, bottom, bottom + height);

		m_IndexSize = width * height;
		m_TileIndexes = new Renderable2D*[m_IndexSize]();
	}
}}