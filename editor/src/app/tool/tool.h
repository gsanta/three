#pragma once
#include <string>
#include "pointer_info.h"

namespace spright { namespace editor {
	using namespace std;

	class Tool {
	private:
		string name;
	public:
		Tool(string name);
		inline virtual void pointerDown(PointerInfo& pointerInfo) {}
		inline virtual void pointerUp(PointerInfo& pointerInfo) {}
		inline virtual void pointerMove(PointerInfo& pointerInfo) {}
		inline virtual void scroll(PointerInfo& pointerInfo) {}
		inline virtual void activate() {}
		inline virtual void deactivate() {}
		inline virtual void setOptions(std::string json) {}
		inline virtual std::string getOptions() { return "{}"; }
	
		inline string getName() const {
			return this->name;
		}
	};
}}