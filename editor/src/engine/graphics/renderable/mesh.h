#include "renderable2d.h";
#include "../renderer/vertex_data.h"

namespace spright { namespace engine {
	using namespace ::engine::graphics;

	class Mesh : public Renderable2D {
	private:
		int m_VertexCount;
		VertexData *m_Vertices;
	public:
		Mesh(int vertexCount, VertexData *vertices, unsigned int color);
		~Mesh();
	};
}}