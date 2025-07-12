type AvatarProps = {
  colorScheme?: 'normal' | 'selected' | 'secondary' | 'success';
  placeholder?: string;
  onClick?(): void;
  src?: string;
};

const colorSchemeToColor = {
  normal: 'bg-neutral',
  selected: 'bg-amber-800',
  secondary: 'bg-gray-400',
  success: 'bg-green-500',
};

const Avatar = ({ colorScheme = 'normal', onClick, placeholder, src }: AvatarProps) => {
  const content = (
    <div className="avatar avatar-placeholder w-20">
      <div className={`${colorSchemeToColor[colorScheme]} text-neutral-content w-32 rounded`}>
        {src && <img src={src} />}
        {placeholder && <span className="text-xl text-center">{placeholder}</span>}
      </div>
    </div>
  );
  return onClick ? (
    <button onClick={onClick} className="cursor-pointer">
      {content}
    </button>
  ) : (
    <div className="cursor-pointer">{content}</div>
  );
};

export default Avatar;
