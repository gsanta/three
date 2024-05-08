import { v4 as uuidv4 } from 'uuid';
import Edit from '../../services/update/Edit';

class Group {
  execute(ids: string[], edit: Edit) {
    const groupId = uuidv4();

    edit.select(null);

    edit.create('group', {
      id: groupId,
      position: [0, 0, 0],
      children: ids,
      dependsOn: [],
      dependents: [],
    });

    const parent = edit.getLastBlock();

    ids.forEach((id) => edit.updateBlock(id, { parent: parent.id }));

    edit.select(parent.id);
  }
}

export default Group;
