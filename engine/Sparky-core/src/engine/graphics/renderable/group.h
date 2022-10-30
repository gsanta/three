#pragma once

#include "renderable2D.h"

namespace spright_engine { namespace graphics  {

	class Group : public spright_engine::graphics::Renderable2D {
	private:
		std::vector<spright_engine::graphics::Renderable2D*> m_Renderables;
		spright_engine::maths::Mat4 m_TransformationMatrix;
	public:
		Group(const spright_engine::maths::Mat4& transform);
		~Group();
		void add(spright_engine::graphics::Renderable2D* renderable);
		void submit(Renderer2D* renderer) const override;
	};

} }