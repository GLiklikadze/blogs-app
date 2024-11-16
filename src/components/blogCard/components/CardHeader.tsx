const CardHeader = ({ cardHeader }) => {
  return (
    <div className="font-semibold leading-none tracking-tight flex flex-col space-y-1.5 p-6">
      {cardHeader}
    </div>
  );
};

export default CardHeader;
