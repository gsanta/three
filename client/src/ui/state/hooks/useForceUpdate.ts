import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  const [, updateState] = useState<object>();
  const forceUpdate = useCallback(() => updateState({}), []);

  return forceUpdate;
};

export default useForceUpdate;
