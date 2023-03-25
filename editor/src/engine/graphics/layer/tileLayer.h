#pragma once

#include <string>
#include "group.h"
#include "../renderable/rect2d.h"
#include "../../../maths/vec2_int.h"
#include "../../../maths/vec2.h"
#include "../renderable/bounds.h"
#include "../renderable/bounds_int.h"
#include "../../../maths/mat4.h"
#include "../camera/camera.h"
#include "../../layout/container.h"
#include "../renderable/bounds.h"

namespace spright { namespace engine {
	using namespace ::spright::maths;

	class TileLayer
	{
	private:
		size_t m_Index = 0;
		std::string m_Name;
		Bounds m_Bounds;
		Group<Rect2D> m_Group;
		float m_TileSize = 0.5f;
		int m_IndexSize;
		bool m_IsEnabled = true;
		Renderable2D** m_TileIndexes;
		BoundsInt m_TileBounds;

	public:
		const static float defaultTileSize;
	public:
		TileLayer(std::string name, Group<Rect2D> group, Bounds bounds, float tileSize = TileLayer::defaultTileSize);
		TileLayer(const TileLayer& tileLayer);
		~TileLayer();

		TileLayer& operator=(const TileLayer&);
		friend bool operator==(const TileLayer&, const TileLayer&);
		friend bool operator!=(const TileLayer&, const TileLayer&);

		void setIndex(size_t index);
		size_t getIndex() const;
		std::string getName() const;
		void setEnabled(bool isEnabled);
		bool isEnabled();

		Rect2D& add(const Rect2D& rect);
		void remove(const Rect2D& rect);
		void clear();
		void render(Camera* camera);
		std::vector<Rect2D*>& getRenderables();

		// TODO: find a better name
		Vec2 getBottomLeftPos(Vec2 pointer) const;
		Vec2 getBottomLeftPos(int tileIndex) const;
		
		Vec2 getWorldPos(int tileIndex) const;
		Vec2 getWorldPos(const Vec2Int tilePos) const;

		Vec2Int getTilePos(Vec2 pos) const;
		Vec2Int getTilePos(int tileIndex) const;
		unsigned int getColumn(int tileIndex) const;
		unsigned int getRow(int tileIndex) const;

		Vec2 getWorldPos(int x, int y);

		void updateTileIndex(int oldIndex, int newIndex);
		Rect2D* getAtTileIndex(int tileIndex) const;
		Rect2D* getAtTilePos(const Vec2Int& tilePos) const;
		int getTileIndex(int tileX, int tileY) const;
		int getTileIndex(Vec2 worldPos) const;

		const BoundsInt& getTileBounds() const;
		int getIndexSize() const;
		inline float getTileSize() const
		{
			return m_TileSize;
		}

		nlohmann::json getJson() const;
		void setJson(std::string json);
		nlohmann::json getLayerDescription() const;

	private:
		void init();
		void copyGroup(const Group<Rect2D>& group);
	};
}}
