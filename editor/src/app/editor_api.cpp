#include "editor_api.h"

extern class Editor *editor;

void set_selection_mode_api(std::string modeStr)
{
    SelectionManipulationMode mode = manip_move;

    if (modeStr == "rotate")
    {
        mode = manip_rotate;
    }
    else if (modeStr == "shear")
    {
        mode = manip_shear;
    }

    editor->getToolHandler()->getToolStore().getSelectTool().setMode(mode);
}

void set_selection_type_api(std::string type)
{
    SelectionType selectionType = rectangle;

    if (type == "wand")
    {
        selectionType = wand;
    }

    editor->getToolHandler()->getToolStore().getSelectTool().setSelectionType(selectionType);
}

void shear_horizontal_api(float shearInRad)
{
    editor->getToolHandler()->getToolStore().getShearTool().setShearInRad(shearInRad);
    editor->getToolHandler()->executeTool("shear");
}

void rotate_api(float rotateInRad)
{
    editor->getToolHandler()->getToolStore().getRotateTool().setRotationInRad(rotateInRad);
    editor->getToolHandler()->executeTool("rotate");
}


#ifdef SPARKY_EMSCRIPTEN


void setLayerIndex(size_t oldIndex, size_t newIndex)
{
    editor->getActiveDocument().getActiveDrawing()->getActiveFrame().changeLayerOrder(oldIndex, newIndex);
}

void removeLayer(size_t layerIndex)
{
    editor->getActiveDocument().getActiveDrawing()->removeLayer(layerIndex);
}

std::string exportDocument()
{
    return editor->getJsonIO()->exportDocument(editor->getDocumentStore()->getActiveDocument()).dump();
}

void importDocument(std::string json)
{
    Document document = editor->getJsonIO()->importDocument(json);
    Document &activeDocument = editor->getDocumentStore()->getActiveDocument();
    editor->getDocumentStore()->setDocument(document);
}

std::string getToolData(std::string tool)
{
    return editor->getToolHandler()->getToolStore().getTool(tool)->getData();
}

std::vector<std::string> getFrames()
{
    const std::vector<Frame> &frames = editor->getActiveDocument().getActiveDrawing()->getFrames();

    std::vector<std::string> target;

    for (const Frame &frame : frames)
    {
        target.push_back(frame.getJson().dump());
    }

    return target;
}

void addFrame()
{
    editor->getDocumentFactory()->createFrame(editor->getDocumentStore()->getActiveDocument());
}

void removeFrame(size_t index)
{
    Drawing *drawing = editor->getActiveDocument().getActiveDrawing();

    if (drawing && drawing->getFrames().size() > 1)
    {
        drawing->removeFrame(index);
    }
}

void setActiveFrame(size_t index)
{
    editor->getActiveDocument().getActiveDrawing()->setActiveFrame(index);
}

std::string getActiveFrame()
{
    return editor->getActiveDocument().getActiveDrawing()->getActiveFrame().getJson().dump();
}

void activateFramePlayer()
{
    editor->getFramePlayer().setIsActive(true);

    Drawing *activeDrawing = editor->getActiveDocument().getActiveDrawing();
    if (activeDrawing)
    {
        editor->getFramePlayer().setDrawing(activeDrawing);
    }
}

void deActivateFramePlayer()
{
    editor->getFramePlayer().setIsActive(false);
    editor->getFramePlayer().clearDrawing();
}

void api_flip_horizontal()
{
    Drawing *drawing = editor->getActiveDocument().getActiveDrawing();

    if (!drawing)
    {
        return;
    }

    if (drawing->getState().getBounds().isNull())
    {
        flip_horizontal(drawing->getActiveFrame().getLayers());
    }
    else
    {
        flip_horizontal(drawing->getActiveFrame().getLayers(), drawing->getState().getBounds());
    }
}

void set_circle_tool_filled(bool isFilled)
{
    CircleTool *circleTool = static_cast<CircleTool *>(editor->getToolHandler()->getToolStore().getTool("circle"));
    circleTool->setFilled(isFilled);
}

bool is_circle_tool_filled()
{
    CircleTool *circleTool = static_cast<CircleTool *>(editor->getToolHandler()->getToolStore().getTool("circle"));
    return circleTool->isFilled();
}

bool is_rectangle_tool_filled()
{
    RectangleTool *rectangleTool =
        static_cast<RectangleTool *>(editor->getToolHandler()->getToolStore().getTool("rectangle"));
    return rectangleTool->isFilled();
}

void set_rectangle_tool_filled(bool isFilled)
{
    RectangleTool *rectangleTool =
        static_cast<RectangleTool *>(editor->getToolHandler()->getToolStore().getTool("rectangle"));
    rectangleTool->setFilled(isFilled);
}

std::string get_canvas_size()
{
    const Bounds &bounds = editor->getActiveDocument().getActiveDrawing()->getBounds();

    nlohmann::json json = {
        {"width", bounds.getWidth()},
        {"height", bounds.getHeight()},
    };

    return json.dump();
}

void set_canvas_size(int width, int height)
{
    Drawing *drawing = editor->getActiveDocument().getActiveDrawing();

    if (!drawing)
    {
        return;
    }

    Drawing newDrawing =
        resize_drawing(*drawing,
                       Bounds::createWithPositions(-width / 2.0f, -height / 2.0f, width / 2.0f, height / 2.0f),
                       *editor->getDocumentFactory());

    editor->getActiveDocument().removeCanvas(drawing->getUuid());
    editor->getActiveDocument().addDrawing(newDrawing);
}

void set_eraser_size(int size)
{
    Tool *tool = editor->getToolHandler()->getToolStore().getTool("erase");
    dynamic_cast<EraserTool *>(tool)->setEraserSize(size);
}

void undo()
{
    editor->getActiveDocument().getHistory()->undo(editor->getActiveDocument());
}

void redo()
{
    editor->getActiveDocument().getHistory()->redo(editor->getActiveDocument());
}

void zoom_in()
{
    editor->getActiveDocument().getBackgroundCanvas().getCamera()->zoomIn();
}

void zoom_out()
{
    editor->getActiveDocument().getBackgroundCanvas().getCamera()->zoomOut();
}

void reset_zoom()
{
    editor->getActiveDocument().getBackgroundCanvas().getCamera()->setZoom(1.0f);
}

void zoom_to_fit()
{
    Camera2d *camera = dynamic_cast<Camera2d *>(editor->getActiveDocument().getBackgroundCanvas().getCamera());
    camera->zoomToFit(editor->getActiveDocument().getActiveDrawing()->getBounds());
}

// void shear_horizontal_api(float angle)
// {
//     Drawing &drawing = editor->getActiveDocument().getActiveDrawing();
//     Bounds bounds = editor->getActiveDocument().getActiveDrawing()->getState().getBounds();
//     TileLayer &currentLayer = editor->getActiveDocument().getActiveDrawing()->getActiveLayer();

//     Vec2 bottomLeft = editor->getActiveDocument().getActiveDrawing()->getState().getBounds().getBottomLeft();
//     Vec2 topRight = editor->getActiveDocument().getActiveDrawing()->getState().getBounds().getTopRight();
//     Vec2Int bottomLeftTile = editor->getActiveDocument().getActiveLayer().getTilePos(bottomLeft);
//     Vec2Int topRightTile = editor->getActiveDocument().getActiveLayer().getTilePos(topRight);

//     shear_horizontal(currentLayer, BoundsInt(bottomLeftTile, topRightTile), angle);
// }

void shear_vertical_api(float angle)
{
    Drawing *drawing = editor->getActiveDocument().getActiveDrawing();

    if (!drawing)
    {
        return;
    }

    Bounds bounds = drawing->getState().getBounds();
    TileLayer &currentLayer = drawing->getActiveLayer();

    Vec2 bottomLeft = drawing->getState().getBounds().getBottomLeft();
    Vec2 topRight = drawing->getState().getBounds().getTopRight();
    Vec2Int bottomLeftTile = drawing->getActiveLayer().getTilePos(bottomLeft);
    Vec2Int topRightTile = drawing->getActiveLayer().getTilePos(topRight);

    shear_vertical(currentLayer, BoundsInt(bottomLeftTile, topRightTile), angle);
}

void generate_spritesheet()
{
    Drawing *drawing = editor->getActiveDocument().getActiveDrawing();

    if (!drawing)
    {
        return;
    }

    editor->getSpriteSheet().generateSpriteSheet(*drawing);
}

EMSCRIPTEN_BINDINGS(spright)
{
    emscripten::function("getFrames", &getFrames);
    emscripten::function("addFrame", &addFrame);
    emscripten::function("removeFrame", &removeFrame);
    emscripten::function("setActiveFrame", &setActiveFrame);
    emscripten::function("getActiveFrame", &getActiveFrame);
    emscripten::function("setLayerIndex", &setLayerIndex);
    emscripten::function("removeLayer", &removeLayer);
    emscripten::function("exportDocument", &exportDocument);
    emscripten::function("importDocument", &importDocument);
    emscripten::function("getToolData", &getToolData);
    emscripten::function("activateFramePlayer", &activateFramePlayer);
    emscripten::function("deActivateFramePlayer", &deActivateFramePlayer);
    emscripten::function("flipHorizontal", &api_flip_horizontal);
    emscripten::function("setCircleToolFilled", &set_circle_tool_filled);
    emscripten::function("isCircleToolFilled", &is_circle_tool_filled);
    emscripten::function("setRectangleToolFilled", &set_rectangle_tool_filled);
    emscripten::function("isRectangleToolFilled", &is_rectangle_tool_filled);
    emscripten::function("getCanvasSize", &get_canvas_size);
    emscripten::function("setCanvasSize", &set_canvas_size);
    emscripten::function("setEraserSize", &set_eraser_size);
    emscripten::function("undo", &undo);
    emscripten::function("redo", &redo);
    emscripten::function("zoomIn", &zoom_in);
    emscripten::function("zoomOut", &zoom_out);
    emscripten::function("resetZoom", &reset_zoom);
    emscripten::function("zoomToFit", &zoom_to_fit);
    emscripten::function("shearHorizontal", &shear_horizontal_api);
    emscripten::function("shearVertical", &shear_vertical_api);
    emscripten::function("rotate", &rotate_api);
    emscripten::function("setSelectionMode", &set_selection_mode_api);
    emscripten::function("setSelectionType", &set_selection_type_api);
    emscripten::function("generateSpriteSheet", &generate_spritesheet);
}

#endif
