interface ClosetitemImageProps {
  imageUrl?: string;
  itemName?: string;
}

const ClosetitemImage: React.FC<ClosetitemImageProps> = ({
  imageUrl,
  itemName,
}) => {
  return (
    <>
      <div className="grid w-full place-items-center overflow-x-scroll aspect-square bg-gray-200">
        {imageUrl && <img className="" src={imageUrl} alt={itemName} />}
      </div>
    </>
  );
};

export default ClosetitemImage;
