#include "../../../../engine/graphics/camera/arc_rotate_camera.h"
#include "../../../../engine/graphics/mesh/builders/box_builder.h"
#include "../../../../engine/graphics/mesh/builders/mesh_builder.h"
#include "../../tool.h"

#include <vector>

namespace spright
{
namespace editor
{
    using namespace engine;

    class MeshCreationTool : public Tool
    {
    public:
        MeshCreationTool();

        void pointerUp(ToolContext &context) override;

    private:
        BoxBuilder m_BoxBuilder;
    };
} // namespace editor
} // namespace spright
