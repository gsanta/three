#pragma once
#include "../../core/run_loop/timed.h"
#include "../../document/document_store.h"
#include "vector"

namespace spright
{
namespace editor
{
    class FramePlayerHandler : public Timed
    {
    public:
        void update(double elapsed) override;

        void setDocumentStore(DocumentStore *documentStore);

        void addDrawing(Drawing &drawing);

    private:
        DocumentStore *m_DocumentStore = nullptr;

        std::vector<FramePlayer *> m_FramePlayers;
    };
} // namespace editor
} // namespace spright
