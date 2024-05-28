import Tool from '../editor/types/Tool';
import ToolName from '../editor/types/ToolName';
import Ungroup from './Ungroup';
import Group from './Group';
import BlockStore from '../editor/stores/block/BlockStore';
import TemplateStore from '../editor/stores/template/TemplateStore';
import TransactionService from '../editor/services/update/TransactionService';

class GroupTool extends Tool {
  constructor(store: BlockStore, update: TransactionService, templates: TemplateStore) {
    super(store, update, ToolName.Group);

    this.templates = templates;

    this.grouper = new Group();
    this.ungrouper = new Ungroup(store);

    this.showOnToolbar = false;
  }

  group() {
    const selectedBlockIds = this.store.getSelectedRootBlockIds();
    const edit = this.update.getUpdate();

    const ungroupedIds = this.ungrouper.execute(selectedBlockIds, edit);
    this.grouper.execute(ungroupedIds, edit);

    edit.commit();
  }

  ungroup() {
    const selectedBlockIds = this.store.getSelectedRootBlockIds();

    const edit = this.update.getUpdate();
    this.ungrouper.execute(selectedBlockIds, edit);

    edit.commit();
  }

  private templates: TemplateStore;

  private grouper: Group;

  private ungrouper: Ungroup;
}

export default GroupTool;
