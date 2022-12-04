#include "tileLayer.h"

namespace spright_engine { namespace graphics {

	TileLayer::TileLayer(std::string name, std::string id, Shader* shader, Renderer2D* renderer, Camera* camera, Dimensions dimensions)
		: Layer(name, id, renderer, shader, camera, dimensions) {
	
		m_TileDimensions = maths::Vec2Int((dimensions.right - dimensions.left) / m_TileSize, (dimensions.top - dimensions.bottom) / m_TileSize);
		m_IndexSize = m_TileDimensions.x * m_TileDimensions.y;
		m_TileIndexes = new Renderable2D*[m_IndexSize]();

		m_TileOffsetX = -(dimensions.left / m_TileSize) + 1;
		m_TileOffsetY = -(dimensions.bottom / m_TileSize) + 1;
	}

	TileLayer::~TileLayer() {
		delete[] m_TileIndexes;
	}

	spright_engine::maths::Vec2 TileLayer::getBottomLeftPos(spright_engine::maths::Vec2 pointer)
	{

		maths::Vec2Int tilePos = getTilePos(pointer);

		float x = static_cast<float>(tilePos.x) * m_TileSize;
		float y = static_cast<float>(tilePos.y) * m_TileSize;

		return spright_engine::maths::Vec2(x, y);
	}

	maths::Vec2Int TileLayer::getTilePos(maths::Vec2 pos) {
		float tileSize = m_TileSize * m_Camera->getZoom();
		int tileX = (int)(pos.x / tileSize);
		tileX = pos.x < 0 ? tileX - 1 : tileX;
		int tileY = (int)(pos.y / tileSize);
		tileY = pos.y < 0 ? tileY - 1 : tileY;

		return maths::Vec2Int(tileX, tileY);
	}

	nlohmann::json TileLayer::getJson()
	{
		nlohmann::json json;

		for (Renderable2D* renderable : m_Renderables) {
			json += renderable->getJson();
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

			spright_engine::graphics::Sprite* sprite = new spright_engine::graphics::Sprite(posX, posY, sizeX, sizeY, 0xff0000ff);
			add(sprite);
		}
	}

	void TileLayer::add(Renderable2D* renderable)
	{
		Layer::add(renderable);

		maths::Vec2 pos = renderable->getBounds()->getCenter();
		maths::Vec2Int tilePos = getTilePos(pos) + maths::Vec2Int(m_TileOffsetX, m_TileOffsetY);

		int index = m_TileDimensions.x * tilePos.y + tilePos.x;
		if (m_IndexSize > index) {
			m_TileIndexes[index] = renderable;

			auto res = getAtTilePos(tilePos.y, tilePos.x);
			int i = 2;
		}
	}

	int TileLayer::getTileIndex(int tileX, int tileY)
	{
		return m_TileDimensions.x * tileY + tileX;
	}

	Renderable2D* TileLayer::getAtTilePos(int x, int y)
	{
		int index = getTileIndex(x, y);

		return m_TileIndexes[index];
	}

}}