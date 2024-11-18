const CardHeader: React.FC<{ cardHeader: string }> = ({ cardHeader }) => {
  return (
    <div className="flex flex-col space-y-1.5 p-6 font-semibold leading-none tracking-tight">
      {cardHeader}
    </div>
  );
};

export default CardHeader;
