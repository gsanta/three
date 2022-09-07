#pragma once
#include <string>

namespace my_app { namespace editor { namespace tool {
	using namespace std;

	class Tool {
	private:
		string name;
	public:
		Tool(string name);
		inline virtual void pointerDown() {}
		inline virtual void pointerUp() {}
	
		inline string getName() const {
			return this->name;
		}
	};
}}}