import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSubTrigger = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}>(({
  className,
  inset,
  children,
  ...props
}, ref) => <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-700 outline-none transition-colors duration-150 ease-in-out hover:bg-brand-lightBlue hover:text-brand-blue focus:bg-brand-lightBlue focus:text-brand-blue data-[state=open]:bg-brand-lightBlue data-[state=open]:text-brand-blue", inset && "pl-8", className)} {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4 text-gray-500 group-hover:text-brand-blue transition" />
  </DropdownMenuPrimitive.SubTrigger>);
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>(({
  className,
  ...props
}, ref) => <DropdownMenuPrimitive.SubContent ref={ref} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md bg-white border border-gray-200 p-1 shadow-lg ring-1 ring-black ring-opacity-5 data-[state=open]:animate-fade-in-up data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className)} {...props} />);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(({
  className,
  sideOffset = 4,
  ...props
}, ref) => <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md bg-white border border-gray-200 p-1 shadow-lg ring-1 ring-black ring-opacity-5 data-[state=open]:animate-fade-in-up data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className)} {...props} />
  </DropdownMenuPrimitive.Portal>);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
}>(({
  className,
  inset,
  ...props
}, ref) => <DropdownMenuPrimitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-700 outline-none transition-colors duration-150 ease-in-out hover:bg-brand-lightBlue hover:text-brand-blue focus:bg-brand-lightBlue focus:text-brand-blue data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:text-gray-400 data-[disabled]:bg-gray-50", inset && "pl-8", className)} {...props} />);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>>(({
  className,
  children,
  checked,
  ...props
}, ref) => <DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-700 outline-none transition-colors duration-150 ease-in-out hover:bg-brand-lightBlue hover:text-brand-blue focus:bg-brand-lightBlue focus:text-brand-blue data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-brand-lightBlue data-[state=checked]:text-brand-blue data-[state=checked]:font-medium", className)} checked={checked} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>);
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>>(({
  className,
  children,
  ...props
}, ref) => <DropdownMenuPrimitive.RadioItem ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-700 outline-none transition-colors duration-150 ease-in-out hover:bg-brand-lightBlue hover:text-brand-blue focus:bg-brand-lightBlue focus:text-brand-blue data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-brand-lightBlue data-[state=checked]:text-brand-blue data-[state=checked]:font-medium", className)} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}>(({
  className,
  inset,
  ...props
}, ref) => <DropdownMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold text-gray-900", inset && "pl-8", className)} {...props} />);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(({
  className,
  ...props
}, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-100 border-t border-gray-100", className)} {...props} />);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-gray-500 opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup };