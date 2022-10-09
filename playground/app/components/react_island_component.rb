# frozen_string_literal: true

class ReactIslandComponent < ViewComponent::Base
  attr_reader :name, :initial_props, :load_on

  def initialize(name:, initial_props: {}, load_on: 'ready')
    super
    @name = name
    @initial_props = initial_props.to_json
    @load_on = load_on
  end
end
