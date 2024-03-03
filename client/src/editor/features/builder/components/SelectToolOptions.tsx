import useSelectedMesh from '../useSelectedMesh';
import SelectToolOptionsContent from './SelectToolOptionsContent';

const SelectToolOptions = () => {
  const selectedMesh = useSelectedMesh();

  if (!selectedMesh) {
    return null;
  }

  return <SelectToolOptionsContent selectedMesh={selectedMesh} />;
};

export default SelectToolOptions;
