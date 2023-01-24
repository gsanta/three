import { makeObservable, observable } from 'mobx';
import NativeSettings from './NativeSettings';

class Settings {
  color = '#000000';

  private _settings: NativeSettings;

  constructor(settings: NativeSettings) {
    this._settings = settings;
    makeObservable(this, {
      color: observable,
      setColor: observable,
    });
  }

  setColor(color: string) {
    this.color = color;

    const r = this.color.substring(1, 3);
    const g = this.color.substring(3, 5);
    const b = this.color.substring(5, 7);
    const a = this.color.substring(7, 9);
    const hexColor = Number('0x' + a + b + g + r);
    this._settings.setColor(hexColor);
  }
}

export default Settings;
