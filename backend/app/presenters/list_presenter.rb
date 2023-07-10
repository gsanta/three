# frozen_string_literal: true

class ListPresenter

  def initialize(items)
    @items = items
  end

  def to_a
    @items.map do |item|
      item_class = "#{item.class.name}Presenter".constantize
      item_class.new(item).to_h
    end
  end
end
