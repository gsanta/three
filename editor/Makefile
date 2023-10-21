help: ## Displays the available commands (this help)
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

configure-emscripten: ## configures the cmake emscripten target
	mkdir -p build/emscripten && \
	cd build/emscripten && \
	emcmake cmake ../../emscripten

compile-emscripten: ## builds the cmake emscripten target
	mkdir -p build/emscripten && \
	cd build/emscripten && \
	cmake --build .

unit-test-docker: ## runs unit tests in a docker container (mainly used by ci)
	docker-compose run --rm unit-test; echo $?

compile-emscripten-docker: ## compiles the editor for the web with emscripten in a docker container (mainly used by ci)
	docker-compose run --rm compile-emscripten; echo $?

lint-docker: ## lints the  cpp files of the editor in a docker container that are changed compared to the master branch (mainly used by ci)
	docker-compose run --rm clang-format; echo $?
