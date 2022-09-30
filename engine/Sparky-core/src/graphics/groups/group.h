#pragma once

#include "../renderable2D.h"

namespace my_app { namespace graphics  {

	class Group : public Renderable2D {
	private:
		std::vector<Renderable2D*> m_Renderables;
		maths::Mat4 m_TransformationMatrix;
	public:
		Group(const maths::Mat4& transform);
		~Group();
		void add(Renderable2D* renderable);
		void submit(Renderer2D* renderer) const override;
	};

} }