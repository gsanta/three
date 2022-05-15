import FloodFillRange from './FloodFillRange';

class FloodFillRangeQueue {
  private ranges: FloodFillRange[] = [];

  private head = 0;

  getCount(): number {
    return this.ranges.length;
  }

  addToEndOfQueue(range: FloodFillRange): void {
    this.ranges.push(range);
  }

  getFirst(): FloodFillRange | undefined {
    if (this.head < this.ranges.length) {
      return this.ranges[this.head];
    }
    return undefined;
  }

  removeAndReturnFirstElement(): FloodFillRange {
    const range = this.ranges.shift();

    if (!range) {
      throw new Error('Trying to remove element from zero-length queue');
    }

    return range;
  }
}

export default FloodFillRangeQueue;
