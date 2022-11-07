#include "tileLayer.h"

namespace spright_engine { namespace graphics {

	TileLayer::TileLayer(std::string id, Shader* shader, Renderer2D* renderer, Camera* camera)
		: Layer(id, renderer, shader, camera) {

		m_Bounds.minX = -10;
		m_Bounds.maxX = 10;
		m_Bounds.minY = -10;
		m_Bounds.maxY = 10;
	}

	TileLayer::~TileLayer() {}

	spright_engine::maths::Vec2 TileLayer::getTilePos(spright_engine::maths::Vec2 pointer)
	{
		int tileX = (int)(pointer.x / m_TileSize);
		tileX = tileX < 0 ? tileX - 1 : tileX;
		int tileY = (int)(pointer.y / m_TileSize);
		tileY = tileY < 0 ? tileY - 1 : tileY;

		float x = static_cast<float>(tileX) * m_TileSize;
		float y = static_cast<float>(tileY) * m_TileSize;

		return spright_engine::maths::Vec2(x, y);
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
}}