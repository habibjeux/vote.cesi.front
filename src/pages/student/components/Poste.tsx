import React from "react";

type PosteProps = {
  unPoste: {
    id: number;
    title: string;
  
  };
  onClick: (id: number) => void;
};

const Poste: React.FC<PosteProps> = ({ unPoste, onClick }) => {
  return (
    <div
      className=" rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white m-4 cursor-pointer w-full"
      onClick={() => onClick(unPoste.id)}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{unPoste.title}</div>
      </div>
    </div>
  );
};

export default Poste;
