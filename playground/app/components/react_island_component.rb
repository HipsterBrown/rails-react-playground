# frozen_string_literal: true

class ReactIslandComponent < ViewComponent::Base
  attr_reader :name, :initial_props

  def initialize(name:, initial_props: {})
    super
    @name = name
    @initial_props = initial_props.to_json
  end
end
