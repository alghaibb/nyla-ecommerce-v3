import Image from "next/image";

interface propsType {
  img: string;
}

const Slide: React.FC<propsType> = ({ img }) => {
  return (
    <div className="flex justify-center items-center h-[60vh] md:h-[50vh]">
      <Image
        src={img}
        alt="carousel images"
        width={940}
        height={470}
        objectFit="contain"
        className="rounded-lg"
        priority
      />
    </div>
  );
};

export default Slide;
