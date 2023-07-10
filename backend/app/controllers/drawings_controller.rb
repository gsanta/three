# frozen_string_literal: true

class DrawingsController < InternalApiController
  def index
    current_user

    drawings = ListDrawings.new(current_user.id).execute
    render json: ListPresenter.new(drawings).to_a
  end

  def show

    drawing = Drawing.find(params.require(:id))

    render json: DrawingPresenter.new(drawing).to_h
  end

  def create
    Drawing.create! user: current_user,
                    title: params.require(:title),
                    content: params.require(:content)
  end

  def update
    update_params = params.permit(:title, :content)
    drawing = Drawing.find(params.require(:id))
    drawing.update!(update_params)
  end

  def destroy
    drawing = Drawing.find(params.require(:id))
    drawing.destroy!

    render json: {}
  end
end
