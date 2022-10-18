#include "camera.h"

namespace my_app_engine { namespace graphics {
	
	Camera::Camera()
	{
		m_View = maths::Mat4::lookAt(maths::Vec3(0, 1, 0), maths::Vec3(0, 0, 0), maths::Vec3(0, 1, 0));
	}

	void Camera::translate2D(my_app_engine::maths::Vec2 translate)
	{
		maths::Vec3 cameraPos(m_Center2D.x + translate.x, m_Center2D.y + translate.y, 1);
		m_View  = maths::Mat4::lookAt(cameraPos, cameraPos + maths::Vec3(0, 0, 1), maths::Vec3(0, 1, 0));
	}

}}