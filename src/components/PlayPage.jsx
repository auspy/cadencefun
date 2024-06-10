import GameBackground from "./GameBackground";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Image from "@/components/Image";
import ShadowText from "@/components/ShadowText";
import Knight from "@/components/Knight";
export default function PlayPage() {
  const knight1Info = {
    name: "Rico",
    color: "brown",
  };
  const knight2Info = {
    name: "Andrew",
    leftImg: "leftBorder2.png",
    rightImg: "rightBorder2.png",
    wins: 0,
    character: "angel",
    attack: 0,
    color: "light-brown",
  };
  const color = (col) => (col ? `var(--${col})` : "");
  return (
    <>
      <Header />
      <GameBackground
        className={"flex flex-col items-center justify-center gap-8 !h-[90vh]"}
      >
        {/* fighting knights */}
        <div className="flex items-center justify-between w-full max-w-3xl">
          {/* knight 1 */}
          <div className="flex flex-col gap-4 items-center">
            <Knight {...knight1Info} color={color(knight1Info.color)} />
            <ShadowText color={color(knight1Info.color)} className=" text-4xl">
              {knight1Info.name || "Player 1"}
            </ShadowText>
          </div>
          <ShadowText className="text-red text-[40px]">VS</ShadowText>

          {/* knight 2 */}
          <div className="flex flex-col gap-4 items-center">
            <Knight
              isLeft={true}
              {...knight2Info}
              color={color(knight2Info.color)}
            />
            <ShadowText
              color={color(knight2Info.color)}
              className="text-red text-4xl"
            >
              {knight2Info.name || "Player 2"}
            </ShadowText>
          </div>
        </div>
        {/* buttons */}
        <Button
          shadow="large"
          href="/play"
          className={` px-4 py-2 bg-accent rounded-[20px] `}
        >
          <Image src={"angels/princeSlash.png"} className={" h-[28px] mr-1"} />
          <span>Attack</span>
          <Image src={"angels/angelSlash.png"} className={" h-[28px] mr-1"} />
        </Button>
      </GameBackground>
    </>
  );
}
