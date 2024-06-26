import Image from "@/components/Image";
import KnightFrameBg from "./KnightFrameBg";
import { useState, useEffect } from "react";
import { colorFunc, colorsType } from "../constants";
export default function Knight({
  className,
  wins = 5,
  attack = 10,
  character = "wizard",
  type,
  color,
  isLeft,
  rightImg,
  leftImg,
  isAttacking,
  isAdmin,
  isLost,
  ...props
}) {
  const knightColor = colorFunc((type && colorsType[parseInt(type)]) || color);
  console.log("color", knightColor, type, colorsType[parseInt(type)]);
  const characters = {
    wizard: "wizardIdle.gif",
    angel: "angelIdle.gif",
    reaper: "reaperIdle.gif",
    prince: "princeIdle.gif",
  };
  const attackCharacters = {
    wizard: "wizardSlash.gif",
    angel: "angelSlash.gif",
  };
  const hurtCharacters = {
    wizard: "wizardHurt.gif",
    angel: "angelHurt.gif",
  };
  const [currentCharacter, setCurrentCharacter] = useState(
    characters[character],
  );

  useEffect(() => {
    console.log("isAttacking", isAttacking, isLost, character);
    let timer = null;
    if (isLost) {
      setCurrentCharacter(hurtCharacters[character]);
    } else if (isAttacking) {
      setCurrentCharacter(attackCharacters[character]);
    } else {
      setCurrentCharacter(characters[character]);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isAttacking, isLost]);
  if (!character) {
    console.error("Character prop is required");
    return null;
  }
  return (
    <div
      className="rounded-[20px]"
      style={{
        boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.20)",
      }}
    >
      {/* knight image */}
      <div
        style={{
          boxShadow:
            "0px 2px 7.6px 0px rgba(255, 255, 255, 0.25) inset, 0px -2px 7.6px 0px rgba(255, 255, 255, 0.25) inset",
          backgroundColor: knightColor || "var(--brown)",
        }}
        className={`${className} rounded-t-[20px]  border-black border-2 w-[284px] h-[336px] overflow-hidden`}
      >
        <KnightFrameBg rightImg={rightImg} leftImg={leftImg}>
          <Image
            src={`angels/${currentCharacter}`}
            className={`h-52  ${isLeft ? "transform scale-x-[-1]" : ""}`}
          />
        </KnightFrameBg>
      </div>
      {/* details */}
      <div className="flex ">
        {!isAdmin && (
          <div className="rounded-es-[20px] p-2 bg-black border-r border-t-0 bg-opacity-80 border-2 border-black text-white text-base flex items-center justify-center gap-2 w-full">
            <Image src={"iconSwords.png"} className={"h-3"} />
            <span className="leading-3">{attack}</span>
          </div>
        )}
        <div
          className={`${isAdmin ? "rounded-b-[20px]" : "rounded-ee-[20px]"} border-l p-2 bg-black border-t-0 bg-opacity-80 border-2 border-black text-white text-base flex items-center justify-center gap-2 w-full`}
        >
          <Image src={"iconCrown.png"} className={"h-3"} />
          <span className="leading-3">{wins}</span>
        </div>
      </div>
    </div>
  );
}
