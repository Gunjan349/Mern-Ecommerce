import React from "react";

const Colors = (colors) => {
  return (
    <>
      {colors &&
        colors.colors &&
        <div className="flex gap-x-3 flex-wrap">
        {colors.colors.map((item) => {
          return (<div className="h-6 w-6 rounded-lg flex xs:mt-3" style={{ background: item.color }}></div>)
        
        })}
        </div>
        }
    </>
  );
};

export default Colors;
