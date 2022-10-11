#pragma once

#include "renderable2D.h"

namespace my_app_engine { namespace graphics  {

	class Group : public my_app_engine::graphics::Renderable2D {
	private:
		std::vector<my_app_engine::graphics::Renderable2D*> m_Renderables;
		my_app_engine::maths::Mat4 m_TransformationMatrix;
	public:
		Group(const my_app_engine::maths::Mat4& transform);
		~Group();
		void add(my_app_engine::graphics::Renderable2D* renderable);
		void submit(Renderer2D* renderer) const override;
	};

} }