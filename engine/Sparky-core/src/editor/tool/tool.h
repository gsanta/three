#pragma once
#include <string>
#include "pointer_info.h"

namespace my_app_editor { namespace tool {
	using namespace std;

	class Tool {
	private:
		string name;
	public:
		Tool(string name);
		inline virtual void pointerDown(PointerInfo& pointerInfo) {}
		inline virtual void pointerUp(PointerInfo& pointerInfo) {}
		inline virtual void pointerMove(PointerInfo& pointerInfo) {}
	
		inline string getName() const {
			return this->name;
		}
	};
}}