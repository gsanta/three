#pragma once
#include "../engine/system/window/input_listener.h"
#include "editor.h"

namespace spright
{
namespace editor
{
    /*
    // This class listens for key events and can be used for development purposes to be able to
    // do actions like changing tools when pressing a key.
    // It's faster and easier to test functionality in this way directly using the desktop version
    // than trying out features through the web application.
    */
    class DevKeyListener : public InputListener
    {
    public:
        inline DevKeyListener(Editor *editor) : m_Editor(editor)
        {
            editor->getWindow()->getInputHandler()->registerListener(this);
        }

        inline ~DevKeyListener()
        {
            if (m_Editor->getWindow() != nullptr)
            {
                m_Editor->getWindow()->getInputHandler()->unRegisterListener(this);
            }
        }

        inline void onKeyChange(int key, bool isPressed) override
        {
            if (!isPressed)
            {
                return;
            }

            if (key == GLFW_KEY_E)
            {
                m_Editor->getToolHandler()->setSelectedTool("erase");
            }
            else if (key == GLFW_KEY_B)
            {
                m_Editor->getToolHandler()->setSelectedTool("brush");
            }
            else if (key == GLFW_KEY_P)
            {
                m_Editor->getToolHandler()->setSelectedTool("paint_bucket");
            }
            else if (key == GLFW_KEY_S)
            {
                m_Editor->getToolHandler()->setSelectedTool("select");
            }
            else if (key == GLFW_KEY_C)
            {
                m_Editor->getToolHandler()->setSelectedTool("circle");

                // m_DocumentFactory->createFrame(m_DocumentStore->getActiveDocument());
                // m_DocumentStore->getActiveDocument().getActiveDrawing().setActiveFrame(
                //     m_DocumentStore->getActiveDocument().getActiveDrawing().getFrames().size() - 1);
                //setSelectedTool("color_picker");
            }
            else if (key == GLFW_KEY_I)
            {
                // m_DocumentStore->getActiveDocument().getCamera().zoomToFit(
                //     m_DocumentStore->getActiveDocument().getActiveDrawing().getBounds());
                m_Editor->getImageExport()->exportImage(m_Editor->getDocumentStore()->getActiveDocument());

                // m_DocumentStore->getActiveDocument().getCamera().updateWindowSize(m_Window->getWidth(),
                //                                                                   m_Window->getHeight());
                //std::string str = m_JsonExport->exportDocument(m_DocumentHandler->getActiveDocument());
                //m_JsonExport->importDocument(m_DocumentHandler, str);
                //m_JsonExport->importDocument("{ \"tiles\": [ {\"i\": 1, \"c\": \"black\"} ] }");
                //m_JsonExport->importDocument("{ \"a\": 2 }");
            }
            else if (key == GLFW_KEY_L)
            {
                m_Editor->getDocumentStore()->getActiveDocument().getCamera().zoomToFit(
                    m_Editor->getDocumentStore()->getActiveDocument().getActiveDrawing().getBounds());
                // setSelectedTool("line");
            }
            else if (key == GLFW_KEY_F)
            {
                Drawing &drawing = m_Editor->getDocumentStore()->getActiveDocument().getActiveDrawing();
                if (drawing.getState().getBounds().isNull())
                {
                    flip_horizontal(drawing.getActiveFrame().getLayers());
                }
                else
                {
                    flip_horizontal(drawing.getActiveFrame().getLayers(), drawing.getState().getBounds());
                }
            }
            else if (key == GLFW_KEY_R)
            {
                // float pixelCount = 16.0f;
                // Bounds drawingBounds = Bounds::createWithPositions(-pixelCount / 2.0f,
                //                                                    -pixelCount / 2.0f,
                //                                                    pixelCount / 2.0f,
                //                                                    pixelCount / 2.0f);
                // Drawing &drawing = m_DocumentStore->getActiveDocument().getActiveDrawing();
                // Drawing newDrawing = resize_drawing(drawing, drawingBounds, m_DocumentFactory);
                // m_DocumentStore->getActiveDocument().removeActiveDrawing();
                // m_DocumentStore->getActiveDocument().addDrawing(newDrawing);
                m_Editor->getToolHandler()->setSelectedTool("rectangle");
                dynamic_cast<RectangleTool *>(m_Editor->getToolHandler()->getToolStore().getTool("rectangle"))
                    ->setFilled(true);
            }
            else if (key == GLFW_KEY_U)
            {
                m_Editor->getDocumentStore()->getActiveDocument().getHistory()->undo(
                    m_Editor->getDocumentStore()->getActiveDocument());
            }
            else if (key == GLFW_KEY_LEFT)
            {
                m_Editor->getToolHandler()->getToolStore().getSelectTool().setMode(SelectTool::MODE_MOVE);
            }
            else if (key == GLFW_KEY_RIGHT)
            {
                m_Editor->getToolHandler()->getToolStore().getSelectTool().setMode(SelectTool::MODE_SHEAR);
                // m_Editor->getToolHandler()->getToolStore().getRotateTool().setRotationInRad(1.5708f);
                // m_Editor->getToolHandler()->executeTool("rotate");
            }
            else if (key == GLFW_KEY_UP)
            {
                m_Editor->getToolHandler()->getToolStore().getSelectTool().setMode(SelectTool::MODE_ROTATE);

                // m_Editor->getToolHandler()->getToolStore().getRotateTool().setRotationInRad(M_PI + 0.1f);
                // m_Editor->getToolHandler()->executeTool("rotate");
            }
            else if (key == GLFW_KEY_H)
            {
                m_Editor->getToolHandler()->getToolStore().getRotateTool().setRotationInRad(-M_PI - 0.1f);
                m_Editor->getToolHandler()->executeTool("rotate");
            }
        }

    private:
        Editor *m_Editor;
    };
} // namespace editor
} // namespace spright
