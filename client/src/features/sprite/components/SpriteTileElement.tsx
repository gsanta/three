import classNames from 'classnames';
import React from 'react';
import { SpriteTile } from '../SpriteTile';

interface SpriteTileProps {
  src: string;
  tile: SpriteTile;
  onClick: () => void;
  isSelected: boolean;
}

const SpriteTileElement = ({ src, tile, onClick, isSelected }: SpriteTileProps) => {
  const { indexX, indexY, width, height } = tile;
  const x = indexX * width;
  const y = indexY * height;

  const className = classNames('sprites__sprite-tile', { 'sprites__sprite-tile--selected': isSelected });

  return (
    <div className={className} onClick={onClick}>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundPosition: `-${x}px -${y}px`,
          backgroundImage: `url("${src}")`,
        }}
      ></div>
    </div>
  );
};

export default SpriteTileElement;
