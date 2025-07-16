const ImageCard = () => {
  return (
    <div className="image-card">
      <img src="https://picsum.photos/200" alt="" />
      <div className="image-details">
        <h1>Water Dog </h1>
        <div className="dash"></div>
        <p>Brad Nickerson</p>
        <button>Favourite</button>
      </div>
    </div>
  );
};

export default ImageCard;
