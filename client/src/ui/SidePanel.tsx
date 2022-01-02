import React from 'react';
import SpritePanel from '../features/sprite/components/SpritePanel';
// import { useGetSpriteByNameQuery } from '../services/spriteApi';

export const SidePanel = () => {
  // const { data, error, isLoading } = useGetSpriteByNameQuery('bulbasaur');


  return (
    <div className="pane__side">
      <SpritePanel />
    </div>
  );
};
