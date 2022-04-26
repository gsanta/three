class Palette {
  private _activeColor = '#FFFFFF';

  set activeColor(color: string) {
    this.activeColor = color;
  }

  get activeColor() {
    return this._activeColor;
  }
}

export default Palette;
