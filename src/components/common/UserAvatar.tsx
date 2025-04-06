import Image from "next/image";

interface UserAvatarProps {
  imageUrl?: string;
  name?: string;
  onClick: () => void;
}

const UserAvatar = ({ imageUrl, name, onClick }: UserAvatarProps) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 bg-white text-blue-500 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
  >
    {imageUrl ? (
      <Image
        width={32}
        height={32}
        src={imageUrl}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
    ) : (
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-white text-lg">{name?.[0]}</span>
      </div>
    )}
  </button>
);

export default UserAvatar;
