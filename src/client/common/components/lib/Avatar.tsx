type AvatarProps = {
  placeholder?: string;
  onClick?(): void;
  src?: string;
};

const Avatar = ({ onClick, placeholder, src }: AvatarProps) => {
  const content = (
    <div className="avatar avatar-placeholder w-20">
      <div className="bg-neutral text-neutral-content w-32 rounded">
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
    <div className="cursor-pointer">{content};</div>
  );
};

export default Avatar;
