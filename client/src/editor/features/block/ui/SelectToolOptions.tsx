import useSelectedMeshes from '../useSelectedMeshes';
import SelectToolOptionsContent from './SelectToolOptionsContent';

const SelectToolOptions = () => {
  const selectedMeshes = useSelectedMeshes();

  if (!selectedMeshes.length) {
    return null;
  }

  return <SelectToolOptionsContent selectedMesh={selectedMeshes[0]} />;
};

export default SelectToolOptions;
