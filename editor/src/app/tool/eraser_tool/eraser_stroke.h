#pragma once
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {

	using namespace engine;

	class EraserStroke {
	private:
		TileLayer* m_DrawLayer = nullptr;
		int m_Size;
		float m_StrokeWidth = 0.1f;

		Rect2D* m_TopLine = nullptr;
		Rect2D* m_RightLine = nullptr;
		Rect2D* m_BottomLine = nullptr;
		Rect2D* m_LeftLine = nullptr;
	public:
		EraserStroke();
		EraserStroke(TileLayer* drawLayer, int eraserSize);
		void draw(const TileLayer& eraseLayer, const Vec2& pos);
		void clear();
		float getStrokeWidth();

	private:
		void init(float tileSize);
		void setPosition(const TileLayer& eraseLayer, const Vec2& pos);
	};
}}