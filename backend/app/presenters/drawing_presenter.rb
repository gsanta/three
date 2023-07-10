# frozen_string_literal: true

class DrawingPresenter

  def initialize(drawing)
    @drawing = drawing
  end

  def to_h
    @drawing.as_json only: [:id, :title, :content]
  end
end
