
const useFunction = (func: Function, updater: (data: any) => void) => {
  const data = func();
  updater(data);
  return data;
}

export default useFunction;
