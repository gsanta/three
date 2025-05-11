type AvatarProps = {
  placeholder?: string;
  onClick(): void;
  src?: string;
};

const Avatar = ({ onClick, placeholder, src }: AvatarProps) => {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <div className="avatar avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-32 rounded">
          {src && <img src={src} />}
          {placeholder && <span className="text-xl text-center">{placeholder}</span>}
        </div>
      </div>
    </button>
  );
};

export default Avatar;
