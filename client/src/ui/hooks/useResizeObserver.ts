import { useCallback, useLayoutEffect, useState } from 'react';

export interface ResizeObserverEntry {
  target: Element;
  contentRect: DOMRectReadOnly;
}

export const useResizeObserver = (node?: HTMLElement, callback?: (entry: DOMRectReadOnly) => void) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      if (callback) {
        callback(entry.contentRect);
      }
    },
    [callback],
  );

  useLayoutEffect(() => {
    if (!node) {
      return;
    }

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => handleResize(entries));
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, handleResize]);

  return [width, height];
};
