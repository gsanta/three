# frozen_string_literal: true
require 'spec_helper'

RSpec.describe Bowling, "#score" do
  context "with no strikes or spares" do
    it "sums the pin count in each roll" do
      bowling = Bowling.new
      20.times { bowling.hit(4) }
      expect(bowling.score).to eq 80
    end
  end
end
