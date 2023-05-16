#include "tool_handler.h"

int x_tmp;
int y_tmp;

namespace spright
{
namespace editor
{
    ToolHandler::ToolHandler(std::shared_ptr<EditorState> editorState,
                             Window *window,
                             DocumentStore *documentStore,
                             Services *services,
                             ImageExport *imageExport,
                             DocumentFactory *documentFactory)
        : m_ToolContext(editorState), m_Window(window), m_DocumentStore(documentStore), m_Services(services),
          m_ImageExport(imageExport), m_DocumentFactory(documentFactory)
    {
        window->getInputHandler()->registerListener(this);
        m_ActiveTools = new vector<Tool *>();
    }

    ToolHandler::~ToolHandler()
    {
    }

    ToolHandler &ToolHandler::operator=(const ToolHandler &toolHandler)
    {
        m_Window = toolHandler.m_Window;
        m_Tools = toolHandler.m_Tools;
        m_ActiveTools = toolHandler.m_ActiveTools;
        m_SelectedTool = toolHandler.m_SelectedTool;
        m_Services = toolHandler.m_Services;

        m_Window->getInputHandler()->registerListener(this);

        return *this;
    }

    void ToolHandler::onMouseUp(bool buttons[3])
    {
        Drawing *activeDrawing = m_DocumentStore->getActiveDocument().getDrawingAt(m_ToolContext.pointer.curr);

        for (Tool *tool : *m_ActiveTools)
        {
            m_ToolContext.pointer.buttons[0] = buttons[0];
            m_ToolContext.pointer.buttons[1] = buttons[1];
            m_ToolContext.pointer.buttons[2] = buttons[2];

            tool->pointerUp(m_ToolContext);
            m_ToolContext.pointer.isDown = false;
        }
    }

    void ToolHandler::onMouseDown(bool buttons[3])
    {
        Vec2 pos = m_DocumentStore->getActiveDocument().getCamera().screenToWorldPos(x_tmp, y_tmp);

        m_ToolContext.pointer.isDown = true;
        m_ToolContext.pointer.down = m_ToolContext.pointer.curr;
        m_ToolContext.pointer.buttons[0] = buttons[0];
        m_ToolContext.pointer.buttons[1] = buttons[1];
        m_ToolContext.pointer.buttons[2] = buttons[2];

        Drawing *activeDrawing = m_DocumentStore->getActiveDocument().getDrawingAt(m_ToolContext.pointer.curr);

        for (Tool *tool : *m_ActiveTools)
        {
            tool->pointerDown(m_ToolContext);
        }
    }


    void ToolHandler::onMouseMove(double x, double y)
    {
        Drawing *activeDrawing = m_DocumentStore->getActiveDocument().getDrawingAt(m_ToolContext.pointer.curr);
        if (m_ToolContext.doc.activeDrawing != activeDrawing)
        {
            m_ToolContext.doc.prevDrawing = m_ToolContext.doc.activeDrawing;
            m_ToolContext.doc.activeDrawing = activeDrawing;
            m_ToolContext.doc.setActiveDocumentChanging(true);
        }
        else
        {
            m_ToolContext.doc.setActiveDocumentChanging(false);
        }

        x_tmp = x;
        y_tmp = y;
        Vec2 pos = m_DocumentStore->getActiveDocument().getCamera().screenToWorldPos(x, y);
        m_ToolContext.pointer.prev = m_ToolContext.pointer.curr;
        m_ToolContext.pointer.curr = pos;

        for (Tool *tool : *m_ActiveTools)
        {
            tool->pointerMove(m_ToolContext);
        }
    }

    void ToolHandler::onScroll(double x, double y)
    {
        m_ToolContext.pointer.scroll = Vec2(x, y);

        for (Tool *tool : *m_ActiveTools)
        {
            tool->scroll(m_ToolContext);
        }
    }

    void ToolHandler::onKeyChange(int key, bool isPressed)
    {
        if (!isPressed)
        {
            return;
        }

        if (key == GLFW_KEY_E)
        {
            setSelectedTool("erase");
        }
        else if (key == GLFW_KEY_B)
        {
            setSelectedTool("brush");
        }
        else if (key == GLFW_KEY_P)
        {
            setSelectedTool("paint_bucket");
        }
        else if (key == GLFW_KEY_S)
        {
            setSelectedTool("select");
        }
        else if (key == GLFW_KEY_C)
        {
            m_DocumentFactory->createFrame(m_DocumentStore->getActiveDocument());
            m_DocumentStore->getActiveDocument().getFrameStore().setActiveFrame(
                m_DocumentStore->getActiveDocument().getFrameStore().getFrames().size() - 1);
            //setSelectedTool("color_picker");
        }
        else if (key == GLFW_KEY_1)
        {
            m_Services->getColorPalette()->color = COLOR_RED;
        }
        else if (key == GLFW_KEY_2)
        {
            m_Services->getColorPalette()->color = COLOR_GREEN;
        }
        else if (key == GLFW_KEY_3)
        {
            m_Services->getColorPalette()->color = COLOR_BLUE;
        }
        else if (key == GLFW_KEY_E)
        {
            if (m_Window->getWidth() == 800)
            {
                m_Window->setSize(1500, 1000);
            }
            else
            {
                m_Window->setSize(800, 1100);
            }
            m_DocumentStore->getActiveDocument().getCamera().updateWindowSize(m_Window->getWidth(),
                                                                              m_Window->getHeight());
            //std::string str = m_JsonExport->exportDocument(m_DocumentHandler->getActiveDocument());
            //m_JsonExport->importDocument(m_DocumentHandler, str);
            //m_JsonExport->importDocument("{ \"tiles\": [ {\"i\": 1, \"c\": \"black\"} ] }");
            //m_JsonExport->importDocument("{ \"a\": 2 }");
        }
        else if (key == GLFW_KEY_L)
        {
            ActiveFrame &frame = m_DocumentStore->getActiveDocument().getActiveFrame();
            frame.setActiveLayer(1);
        }
        else if (key == GLFW_KEY_N)
        {
            setSelectedTool("new_drawing");
        }
        else if (key == GLFW_KEY_X)
        {
            m_ImageExport->exportImage(m_DocumentStore->getActiveDocument());
        }
        else if (key == GLFW_KEY_F)
        {
            Drawing &drawing = m_DocumentStore->getActiveDocument().getActiveDrawing();
            if (drawing.getState().getBounds().isNull())
            {
                flip_horizontal(drawing.getActiveFrame().getLayers());
            }
            else
            {
                flip_horizontal(drawing.getActiveFrame().getLayers(), drawing.getState().getBounds());
            }
            // size_t activeIndex = m_DocumentStore->getActiveDocument().getActiveFrame().getIndex();
            // size_t maxIndex = m_DocumentStore->getActiveDocument().getFrameStore().getFrames().size();

            // if (activeIndex == maxIndex - 1)
            // {
            //     activeIndex = 0;
            // }
            // else
            // {
            //     activeIndex = activeIndex + 1;
            // }
            // m_DocumentStore->getActiveDocument().getFrameStore().setActiveFrame(activeIndex);
        }
        else if (key == GLFW_KEY_R)
        {
            m_DocumentStore->getActiveDocument().getFrameStore().removeFrame(1);
        }
    }

    void ToolHandler::addTool(Tool *tool)
    {
        m_Tools.push_back(tool);
    }

    Tool *ToolHandler::getTool(string name) const
    {
        auto it = find_if(this->m_Tools.begin(), this->m_Tools.end(), [&name](const Tool *tool) {
            return tool->getName() == name;
        });

        return *it;
    }

    vector<Colorable *> ToolHandler::getColorableTools()
    {
        vector<Colorable *> colorables;

        for (Tool *tool : m_Tools)
        {
            if (Colorable *colorable = dynamic_cast<Colorable *>(tool))
            {
                // old was safely casted to NewType
                colorables.push_back(colorable);
            }
        }

        return colorables;
    }

    Tool *ToolHandler::getSelectedTool()
    {
        return m_SelectedTool;
    }

    void ToolHandler::setSelectedTool(string name)
    {
        if (m_SelectedTool != nullptr)
        {
            removeActiveTool(m_SelectedTool->getName());

            Drawing *activeDrawing = m_DocumentStore->getActiveDocument().getDrawingAt(m_ToolContext.pointer.curr);
            m_SelectedTool->deactivate(m_ToolContext);
        }

        if (!isActiveTool(name))
        {
            addActiveTool(name);
        }

        m_SelectedTool = getTool(name);
        m_SelectedTool->activate();
    }

    bool ToolHandler::isActiveTool(string name)
    {
        Tool *tool = getTool(name);

        auto it = find((*m_ActiveTools).begin(), (*m_ActiveTools).end(), tool);

        return it != (*m_ActiveTools).end();
    }
} // namespace editor
} // namespace spright
