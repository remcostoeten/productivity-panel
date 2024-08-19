"use client";
import IconButton from "./IconButton";

const VerticalNavbar: React.FC = () => (
  <nav className="flex flex-col px-4 py-1.5 border-solid border-r-[0.8px] border-r-neutral-800 w-[73px] max-md:hidden">
    <div className="flex flex-col justify-center items-center px-3 w-10 h-10 rounded bg-zinc-900">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/564d2bc82afc582578b21cbe31fa7ccce6d93b9cdd9db5f5413bfb6f42a184e0?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
        alt="Main logo"
        className="object-contain w-4 aspect-square"
      />
    </div>
    <div className="flex flex-col justify-center items-start py-3 pr-1 pl-3 w-full text-xs font-medium leading-none text-center text-black whitespace-nowrap rounded">
      <div className="self-stretch px-1 py-0.5 bg-orange-500 rounded-full min-h-[14px] w-[17px]">
        16
      </div>
    </div>
    <IconButton
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a5559d6515153c71066cfc9dbc8a99b37452a7d82994ae48cc7667031128878?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
      alt="Second icon"
    />
    <div className="flex flex-col min-h-[746px] pt-[642px] max-md:hidden max-md:pt-24">
      <div className="flex flex-col pt-6 w-full">
        <IconButton
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c98fd55d7dea78ac321568e3c8e658a3e23c95ba4795b3c9600a74bbda311c7?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
          alt="Third icon"
        />
        <IconButton
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b284e4556f5f843e3a92c1cf1373e53c01336882bdbda382218d577582b435e3?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
          alt="Fourth icon"
        />
      </div>
    </div>
  </nav>
);

export default VerticalNavbar;
