import Edit from '../editor/services/update/Edit';

class Group {
  execute(ids: string[], edit: Edit) {
    // const groupId = uuidv4();

    edit.select(null);

    // edit.create({
    //   name: 'group',
    //   id: groupId,
    //   isHovered: false,
    //   isSelected: false,
    //   slotSources: [],
    //   slotTarget: undefined,
    //   position: [0, 0, 0],
    //   children: ids,
    //   dependsOn: [],
    //   dependents: [],
    // });

    const parent = edit.getLastBlock();

    ids.forEach((id) => edit.updateBlock(id, { parent: parent.id }));

    edit.select(parent.id);
  }
}

export default Group;
