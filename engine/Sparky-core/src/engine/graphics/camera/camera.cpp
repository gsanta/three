#include "camera.h"

namespace spright_engine { namespace graphics {
	
	Camera::Camera()
	{
		m_View = maths::Mat4::lookAt(maths::Vec3(0, 0, 0.5f), maths::Vec3(0, 0, 0), maths::Vec3(0, 1, 0));
	}

	void Camera::translate2D(spright_engine::maths::Vec2 translate)
	{
		maths::Vec3 cameraPos(m_Center2D.x + translate.x, m_Center2D.y + translate.y, 1);
		m_View  = maths::Mat4::lookAt(cameraPos, cameraPos + maths::Vec3(0, 0, 1), maths::Vec3(0, 1, 0));
	}

}}