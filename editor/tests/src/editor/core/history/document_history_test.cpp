#include "../../test_helpers/document_builder.h"
#include "../src/app/core/history/document_history.h"
#include "../src/app/core/history/undoable.h"

#include <catch2/catch_test_macros.hpp>
#include <set>

using namespace spright::editor;

class TestUndoable : public Undoable
{
public:
    TestUndoable(int data, std::set<int> &dataHolder) : m_DataHolder(dataHolder), m_Data{data}
    {
    }

    void undo(Document &document) const override
    {
        for (int data : m_Data)
        {
            m_DataHolder.insert(data);
        }
    }

    void redo(Document &document) const override
    {
        for (int data : m_Data)
        {
            m_DataHolder.erase(data);
        }
    }

private:
    std::set<int> &m_DataHolder;

    std::vector<int> m_Data;
};

SCENARIO("DocumentHistory")
{
    Document document = DocumentBuilder().build();

    int undoCount = 0;

    int redoCount = 0;

    DocumentHistory history;

    std::set<int> dataHolder;

    GIVEN("an empty history")
    {
        WHEN("calling undo")
        {
            THEN("nothing happens")
            {
                history.undo(document);

                REQUIRE(undoCount == 0);
                REQUIRE(history.undoSize() == 0);
            }
        }

        WHEN("calling redo")
        {
            THEN("nothing happends")
            {
                dataHolder.insert(1);

                history.redo(document);

                REQUIRE(dataHolder.find(1) != dataHolder.end());
                REQUIRE(history.redoSize() == 0);
            }
        }

        WHEN("adding an undoable to the history")
        {
            history.add(std::make_shared<TestUndoable>(1, dataHolder));

            WHEN("calling undo")
            {
                REQUIRE(history.undoSize() == 1);
                history.undo(document);

                THEN("undoable's undo action is executed and moved to the redo list")
                {
                    REQUIRE(dataHolder.find(1) != dataHolder.end());
                    REQUIRE(history.undoSize() == 0);
                    REQUIRE(history.redoSize() == 1);
                }

                WHEN("calling redo")
                {
                    history.redo(document);

                    THEN("undoable's redo action is executed and moved into undo list")
                    {
                        REQUIRE(dataHolder.find(1) == dataHolder.end());
                        REQUIRE(history.undoSize() == 1);
                        REQUIRE(history.redoSize() == 0);
                    }
                }
            }
        }
    }
}
