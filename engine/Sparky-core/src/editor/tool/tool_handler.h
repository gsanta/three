#include <vector>
#include <iostream>
#include "tool.h"
#include "brush_tool.h"
#include "../../graphics/window/window.h"
#include "../../graphics/window/input_listener.h"

using namespace my_app::graphics;

namespace my_app { namespace editor { namespace tool {

	using namespace std;

	class ToolHandler : InputListener {
	private:
		Window* m_Window;
		vector<Tool*> tools;
		Tool* m_ActiveTool;
	public:
		ToolHandler(Window* window, DocumentHandler* documentHandler);
		virtual void onMouseUp(int button) override;
		virtual void onMouseDown(int button) override;

		Tool* getTool(string name) const;

		inline Tool* getActiveTool() const {
			return m_ActiveTool;
		}
	};
} } }