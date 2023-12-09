#include "../../../../engine/graphics/mesh/builders/box_builder.h"
#include "../../../../engine/graphics/mesh/builders/mesh_builder.h"
#include "../../../../engine/scene/cameras/arc_rotate_camera.h"
#include "../../../utils/conversions.h"
#include "../../pixel_tool.h"

#include <vector>

namespace spright
{
namespace editing
{
    using namespace engine;

    class MeshCreationTool : public PixelTool
    {
    public:
        MeshCreationTool();

        void pointerUp(ToolContext &context) override;

    private:
        BoxBuilder m_BoxBuilder;
    };
} // namespace editing
} // namespace spright
