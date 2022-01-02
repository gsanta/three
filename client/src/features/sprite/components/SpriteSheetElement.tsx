import React, { useState } from 'react';
import { SpriteSheet } from '../SpriteSheet';
import SpriteTileElement from './SpriteTileElement';

interface TilesProps {
  sheet: SpriteSheet;
  onTileSelected: (index: number) => void;
  selectedTile: number | null;
}

const Tiles = (props: TilesProps) => {
  const { onTileSelected, selectedTile } = props;
  const { columns, tiles, src, tileWidth, tileHeight } = props.sheet;
  const spriteTiles: JSX.Element[] = [];

  let currentRow = 0;
  let currentCol = 0;
  for (let i = 0; i < tiles; i++) {
    spriteTiles.push(
      <SpriteTileElement
        key={i}
        onClick={() => onTileSelected(i)}
        isSelected={selectedTile === i}
        src={src}
        tile={{ indexX: currentCol, indexY: currentRow, width: tileWidth, height: tileHeight }}
      />,
    );

    if (currentCol === columns - 1) {
      currentCol = 0;
      currentRow += 1;
    } else {
      currentCol += 1;
    }
  }

  return <>{spriteTiles}</>;
};

const SpriteSheetElement = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const sheet: SpriteSheet = {
    name: 'player',
    tileWidth: 64,
    tileHeight: 64,
    columns: 22,
    tiles: 45,
    src: 'sprites/player.png',
  };

  const spriteSheet = (
    <div
      className="sprites__spritesheet"
      style={{ backgroundImage: `url("${sheet.src}")` }}
      onClick={() => setOpen(!isOpen)}
    ></div>
  );

  return (
    <div className="sprites">
      {spriteSheet}
      {isOpen ? <Tiles sheet={sheet} onTileSelected={(i) => setSelectedTile(i)} selectedTile={selectedTile} /> : null}
    </div>
  );
};

export default SpriteSheetElement;
