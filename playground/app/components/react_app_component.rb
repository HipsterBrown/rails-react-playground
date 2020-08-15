class ReactAppComponent < ViewComponent::Base
  def initialize(name:, initial_props:)
    @name = name
    @initial_props = initial_props.to_json
  end
end
