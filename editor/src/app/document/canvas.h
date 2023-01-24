#pragma once

namespace spright {

	class Canvas {

	private:
		int m_Width;
		int m_Height;

	public:
		Canvas(int width, int height);
		float getWidth();
		float getHeight();
	};
}