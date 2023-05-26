
module FrontendAssetHelper
  def javascript_asset_tag(entry)
    FrontendAsset.entry(entry).js.map { |js| "<script src=\"#{js}\"></script>" } .join.html_safe
  rescue NoMethodError => m
    raise "Invalid entry point #{entry}: #{m}"
  end

  def css_asset_tag(entry)
    FrontendAsset.entry(entry).css.map { |url| "<link rel=\"stylesheet\" href=\"#{url}\"></link>" } .join.html_safe
  rescue NoMethodError => m
    raise "Invalid entry point #{entry}: #{m}"
  end
end
