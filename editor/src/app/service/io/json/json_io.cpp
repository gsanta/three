#include "json_io.h"

namespace spright
{
namespace editor
{

    JsonIO::JsonIO(DocumentFactory *documentFactory) : m_DocumentFactory(documentFactory)
    {
        m_TileLayerExport = new TileLayerExport(documentFactory);
    }

    JsonIO::~JsonIO()
    {
        delete m_TileLayerExport;
    }

    nlohmann::json JsonIO::exportDocument(Document &document)
    {

        nlohmann::json framesJson = {{"frames", {}}};

        for (Frame &frame : document.getActiveDrawing().getFrames())
        {

            nlohmann::json layersJson = {{"layers", {}}};

            for (TileLayer &layer : frame.getLayers())
            {
                nlohmann::json jsonLayer = m_TileLayerExport->exportLayer(layer);
                layersJson["layers"] += jsonLayer;
            }

            framesJson["frames"] += layersJson;
        }


        return framesJson;
    }


    Document JsonIO::importDocument(std::string string) const
    {
        nlohmann::json json = nlohmann::json::parse(string);
        int frameCount = json["frames"].size();

        Document document = m_DocumentFactory->createEmptyDocument();
        std::vector<Frame> frames;

        for (int i = 0; i < frameCount; i++)
        {
            Frame frame;
            nlohmann::json frameJson = json["frames"][i];

            size_t layerCount = frameJson["layers"].size();

            for (int j = 0; j < layerCount; j++)
            {
                TileLayer tileLayer = m_TileLayerExport->importLayer(frameJson["layers"][j]);
                frame.addLayer(tileLayer);
            }
            frames.push_back(frame);
        }

        CreateDrawingProps createDrawingProps(frames[0].getLayers()[0].getBounds());
        createDrawingProps.hasInitialLayer = false;

        Drawing drawing = m_DocumentFactory->createDrawing(createDrawingProps);

        for (Frame &frame : frames)
        {
            drawing.addFrame(frame);
        }

        document.addDrawing(drawing);

        return document;
    }
} // namespace editor
} // namespace spright
