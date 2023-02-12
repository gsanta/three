#pragma once

#include "renderable2d.h"

namespace spright { namespace engine {
	using namespace ::spright::maths;

	class Group : public Renderable2D {
	private:
		std::vector<Renderable2D*> m_Renderables;
		Mat4 m_TransformationMatrix;
	public:
		Group(const Mat4& transform);
		~Group();
		void add(Renderable2D* renderable);
		void submit(Renderer2D* renderer) const override;
	};

} }