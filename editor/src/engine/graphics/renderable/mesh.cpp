#include "mesh.h"

namespace spright { namespace engine {

	Mesh::Mesh(int vertexCount, VertexData *vertices, unsigned int  color)
		: m_VertexCount(vertexCount), m_Vertices(vertices), Renderable2D(color)
	{
	}

	Mesh::~Mesh()
	{
	}
}}