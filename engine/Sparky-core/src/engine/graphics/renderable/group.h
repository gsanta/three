#pragma once

#include "renderable2D.h"

namespace engine { namespace graphics  {
	using namespace ::engine::maths;

	class Group : public engine::graphics::Renderable2D {
	private:
		std::vector<engine::graphics::Renderable2D*> m_Renderables;
		Mat4 m_TransformationMatrix;
	public:
		Group(const Mat4& transform);
		~Group();
		void add(engine::graphics::Renderable2D* renderable);
		void submit(Renderer2D* renderer) const override;
	};

} }