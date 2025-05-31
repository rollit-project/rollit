import {
  RollerCoasterBackIcon,
  RollerCoasterPlayIcon,
  RollerCoasterResetIcon,
} from '@/assets/icons';

const PanelActionButton = () => {
  return (
    <div className="relative h-[50px] w-[200px] rounded-tl-[10px] border border-white bg-[rgba(255,255,255,0.3)] text-right transition-transform duration-500">
      <div className="flex h-full items-center justify-end gap-10 pr-4">
        <RollerCoasterPlayIcon className="h-full cursor-pointer fill-white transition-all duration-300 hover:fill-black hover:stroke-black" />
        <RollerCoasterBackIcon className="h-full cursor-pointer stroke-white transition-all duration-300 hover:fill-black hover:stroke-black" />
        <RollerCoasterResetIcon className="h-full cursor-pointer fill-white stroke-white transition-all duration-300 hover:fill-black hover:stroke-black" />
      </div>
    </div>
  );
};

export default PanelActionButton;
