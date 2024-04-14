import Block from '@/editor/types/Block';
import { getBlock } from '../utils/blockUtils';
import { v4 as uuidv4 } from 'uuid';
import BlockType from '@/editor/types/BlockType';

class Group {
  constructor(blocks: BlockType[], ids: string[], roots: string[], meshes: Record<string, Block>) {
    this.blocks = blocks;
    this.ids = ids;
    this.meshes = { ...meshes };
    this.roots = [...roots];
  }

  execute() {
    const newGroup = this.group();
    this.updateMeshes(newGroup);
    this.updateRoots(newGroup);

    return {
      roots: this.roots,
      meshes: this.meshes,
      newGroup,
    };
  }

  private group() {
    const groupBlock = getBlock(this.blocks, 'group');

    const groupId = uuidv4();

    const newGroup: Block = {
      ...groupBlock.data,
      id: groupId,
      position: [0, 0, 0],
      children: this.ids,
    };

    this.ids.forEach((id) => (this.meshes[id].parent = newGroup.id));

    return newGroup;
  }

  private updateMeshes(newGroup: Block) {
    this.meshes[newGroup.id] = newGroup;
  }

  private updateRoots(newGroup: Block) {
    this.roots = this.roots.filter((root) => !this.ids.includes(root));
    this.roots.push(newGroup.id);
  }

  private blocks: BlockType[];

  private ids: string[];

  private meshes: Record<string, Block>;

  private roots: string[];
}

export default Group;
