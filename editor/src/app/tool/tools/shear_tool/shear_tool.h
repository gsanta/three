#pragma once

#include "../../../algorithm/rotate.h"
#include "../../../core/history/tile_undo.h"
#include "../../context/tool_context.h"
#include "../../tool.h"

namespace spright
{
namespace editor
{
    class ShearTool : public Tool
    {
    public:
        ShearTool();

        void pointerDown(const ToolContext &toolContext) override;

        void pointerMove(const ToolContext &toolContext) override;

        void pointerUp(const ToolContext &toolContext) override;

        void execute(const ToolContext &toolContext) override;

        // only relevant when using execute directly, without using pointer events
        void setShearInRad(float rad);

        // only relevant when using execute directly, without using pointer events
        void setShearDirectionAsVertical();

        // only relevant when using execute directly, without using pointer events
        void setShearDirectionAsHorizontal();

        /*
         * When moving the pointer away from the selection center shear is increased by 10 deg each time
         * distance from selection center exceeds this amount
         */
        int getTileLenghtFor10DegShear() const;

    private:
        double calcShearAngle(const TileLayer &layer, const Vec2 &cursorPos, const Vec2 &centerPos) const;

        void calcShearDirection(const TileLayer &layer, const Vec2 &cursorPos, const Vec2 &centerPos);

        void shearSelection(const ToolContext &toolContext, double angle);

        /*
         * Get the maximum area that can be impacted by the rotation, so original state can be restored
         */
        BoundsInt getBoundsOfImpactedArea(const BoundsInt &selectionBounds, const BoundsInt &maxBounds) const;

    private:
        // 40def
        double m_MaxShear = 0.698132;

        double m_PrevShearAngle = 0;

        float m_ShearInRad = 0;

        float m_IsHorizontal = true;

        int m_TileLenghtFor10DegShear = 2;

        std::unique_ptr<TileUndo> m_Undo;

        BoundsInt m_ImpactedArea;
    };
} // namespace editor
} // namespace spright
