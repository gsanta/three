#pragma once
#include "../../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {

	using namespace engine;

	class EraserStroke {
	private:
		TileLayer* m_DrawLayer = nullptr;
		const int m_EraserSize;

		Rect2D* m_TopLine = nullptr;
		Rect2D* m_RightLine = nullptr;
		Rect2D* m_BottomLine = nullptr;
		Rect2D* m_LeftLine = nullptr;
	public:
		EraserStroke(TileLayer* drawLayer, const int eraserSize);
		void draw(TileLayer* eraseLayer, Vec2& pos);
		void clear();

	private:
		void init(float tileSize);
		void setPosition(TileLayer* eraseLayer, Vec2& pos);
	};
}}