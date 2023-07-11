# frozen_string_literal: true

module FrontendAsset
  class EntryNotFound < StandardError; end

  class Entry
    def initialize(assets)
      @assets = assets
    end

    def js
      @assets.js&.map { |js| FrontendAsset.resolve_asset_url(js) } || []
    end

    def css
      @assets.css&.map { |css| FrontendAsset.resolve_asset_url(css) } || []
    end
  end

  class << self
    def entry(name)
      controller_name = name.split('/')[-2];
      raise EntryNotFound, "Invalid entry point #{name}" unless manifest.entrypoints.respond_to? controller_name
      Entry.new manifest.entrypoints[controller_name].assets
    end

    def asset_url(path)
      resolve_asset_url(manifest[path])
    end

    # internal method, please don't use it
    def resolve_asset_url(file)
      (base_url + "/" + file).to_s
    end

    def base_url
      URI(ENV['RENDER_EXTERNAL_URL'])
    end

    private

    def manifest
      @manifest ||= manifest_client.get("#{ENV['RENDER_EXTERNAL_URL']}/manifest.json").body
    end

    def manifest_client
      Faraday.new do |f|
        if Rails.env.production?
          f.request :retry, max: 5, interval: 0.05
        end
        f.response :json, parser_options: { object_class: OpenStruct }
        f.adapter :net_http
      end
    end

    def version_path
      "/version-main/"
    end
  end
end
