import Pole, { PartialPole } from '@/editor/services/scene/types/Pole';
import Updater from './Updater';

class PoleUpdater extends Updater<'poles'> {
  update(orig: Pole, partial: PartialPole) {
    const updated: Pole = {
      ...orig,
      ...partial,
      pins: {
        ...orig.pins,
        ...partial.pins,
      },
    };

    return updated;
  }
}

export default PoleUpdater;
