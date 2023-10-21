help: ## Displays the available commands (this help)
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

configure-target-emscripten: ## configures the cmake emscripten target
	cd emscripten/build && \
	emcmake cmake ..

build-target-emscripten: ## builds the cmake emscripten target
	cd emscripten/build && \
	cmake --build .
