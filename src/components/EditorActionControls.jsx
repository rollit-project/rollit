import {
  RollerCoasterPlayIcon,
  RollerCoasterResetIcon,
  RollerCoasterUndoIcon,
} from '@/assets/icons';

const EditorActionControls = () => {
  return (
    <div className="relative h-[50px] w-[200px] rounded-tl-[10px] border border-white bg-[rgba(255,255,255,0.3)] text-right transition-transform duration-500">
      <div className="flex h-full items-center justify-end gap-10 pr-4">
        <button
          type="button"
          className="h-full cursor-pointer fill-white transition-all duration-300 hover:fill-black"
        >
          <RollerCoasterPlayIcon />
        </button>
        <button
          type="button"
          className="h-full cursor-pointer stroke-white transition-all duration-300 hover:stroke-black"
        >
          <RollerCoasterUndoIcon />
        </button>
        <button
          type="button"
          className="h-full cursor-pointer fill-white stroke-white transition-all duration-300 hover:fill-black hover:stroke-black"
        >
          <RollerCoasterResetIcon />
        </button>
      </div>
    </div>
  );
};

export default EditorActionControls;
