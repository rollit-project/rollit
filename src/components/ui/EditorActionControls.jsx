import {
  RollerCoasterPlayIcon,
  RollerCoasterResetIcon,
  RollerCoasterUndoIcon,
} from '@/assets/icons';

const icons = [
  <RollerCoasterPlayIcon
    name="play"
    className="fill-white transition-all duration-300 hover:fill-black"
  />,
  <RollerCoasterUndoIcon
    name="undo"
    className="stroke-white transition-all duration-300 hover:stroke-black"
  />,
  <RollerCoasterResetIcon
    name="reset"
    className="fill-white stroke-white transition-all duration-300 hover:fill-black hover:stroke-black"
  />,
];

const EditorActionControls = () => {
  return (
    <div className="relative h-[50px] w-[200px] rounded-tl-[10px] border border-white bg-[rgba(255,255,255,0.3)] text-right transition-transform duration-500">
      <div className="flex h-full items-center justify-end gap-10 pr-4">
        {icons.map((icon) => (
          <button type="button" key={icon.name} className="h-full cursor-pointer">
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditorActionControls;
