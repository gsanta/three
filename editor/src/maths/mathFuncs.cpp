#include "mathFuncs.h"

 namespace spright { namespace maths {

	float toRadians(float degrees) {
		return degrees * (M_PI / 180.0f);
	}

	Vec3 linePlaneIntersection(Vec3 la, Vec3 lb, Vec3 p0, Vec3 p1, Vec3 p2) {
		Vec3 p01 = p1 - p0;
		Vec3 p02 = p2 - p0;
		Vec3 lab = lb - la;

		float t = p01.cross(p02).dot(la - p0) / (-lab.dot(p01.cross(p02)));

		return la + lab * Vec3(t, t, t);
	}
 } }