import useEditorContext from '@/app/editor/useEditorContext';
import Button from '@/client/common/components/lib/Button';


const JoinElectricSystemsMenuItem = ({ onClick }: { onClick(): void}) => {


  return <Button onClick={onClick}>Join electric systems</Button>;
};

export default JoinElectricSystemsMenuItem;
