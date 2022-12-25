import AppModule from './AppModule';

class ModuleManager {
  private modules: AppModule[] = [];

  addModule(module: AppModule) {
    this.modules.push(module);
  }

  start() {
    this.modules.forEach((module) => module.enable());
  }
}

export default ModuleManager;
