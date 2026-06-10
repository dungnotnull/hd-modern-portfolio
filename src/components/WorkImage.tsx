interface Props {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        data-cursor="disable"
      >
        <img src={props.image} alt={props.alt} />
      </a>
    </div>
  );
};

export default WorkImage;
