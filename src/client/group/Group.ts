import Edit from '../editor/services/update/Edit';

class Group {
  execute(ids: string[], edit: Edit) {
    edit.select(null);

    const parent = edit.getLastBlock();

    ids.forEach((id) => edit.updateBlock(id, { parent: parent.id }));

    edit.select(parent.id);
  }
}

export default Group;
