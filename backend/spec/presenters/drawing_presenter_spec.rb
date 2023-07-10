# frozen_string_literal: true

require "rails_helper"

RSpec.describe DrawingPresenter do
  subject { described_class.new(drawing).to_h }

  let(:drawing) do
    build :drawing
  end

  let(:expected_drawing) do
    {
      'title' => drawing.title,
      "content" => drawing.content
    }
  end

  it { is_expected.to match expected_drawing }
end
