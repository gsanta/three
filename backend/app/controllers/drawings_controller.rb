# frozen_string_literal: true

class DrawingsController < InternalApiController
  def index
    @drawings = Drawing.all

    render react: {
      pageProps: {
        hello: "world",
      }
    }
  end

  def create
    create_drawing_attributes
    render json: {
      pageProps: {
        hello: "world",
      }
    }
  end

  private

  def create_drawing_attributes
    create_params = params.require(:drawing).permit(:title, :content).require [:title, :content]
  end
end
