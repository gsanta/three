import BlockCategory from '@/client/editor/types/BlockCategory';
import BlockSelectedSettings from '@/client/editor/types/BlockSelectedSettings';
import BlockSettings, { defaultBlockSettings } from '@/client/editor/types/BlockSettings';
import BlockType from '@/client/editor/types/BlockType';
import mergeDeep from '@/client/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';

const parseBlockSettings = (
  settings: (PartialDeep<BlockSettings> & { category: BlockCategory })[],
  blocks: BlockType[],
) => {
  const settingsRecord: Record<string, BlockSettings> = {};
  const selectedSettingsRecord: Record<string, BlockSelectedSettings> = {};

  blocks.forEach((block) => {
    if (settingsRecord[block.category]) {
      return;
    }

    const setting = settings.find((currentSetting) => currentSetting.category === block.category);

    if (setting) {
      settingsRecord[block.category] = mergeDeep<BlockSettings>(
        mergeDeep<BlockSettings>(defaultBlockSettings, setting, 'merge'),
        {
          category: block.category,
        },
        'merge',
      );
      selectedSettingsRecord[block.category] = {
        category: block.category,
        scale: {
          ...[1, 1, 1],
          ...setting.scale?.default,
        },
        rotation: {
          ...[0, 0, 0],
          ...setting.rotation?.default,
        },
      };
    } else {
      settingsRecord[block.category] = mergeDeep<BlockSettings>(
        defaultBlockSettings,
        { category: block.category },
        'merge',
      );
      selectedSettingsRecord[block.category] = {
        category: block.category,
        rotation: [
          defaultBlockSettings.rotation.x[0],
          defaultBlockSettings.rotation.y[0],
          defaultBlockSettings.rotation.z[0],
        ],
        scale: [defaultBlockSettings.scale.x[0], defaultBlockSettings.scale.y[0], defaultBlockSettings.scale.z[0]],
      };
    }
  });

  return {
    settings: settingsRecord,
    selectedSettings: selectedSettingsRecord,
  };
};

export default parseBlockSettings;