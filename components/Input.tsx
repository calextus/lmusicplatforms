import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Replacing `interface` with `type` for InputProps to avoid the empty interface warning
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    // Optional: Add custom props if needed, like `variant` for different input styles
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type = "text",  // Default type set to "text" for usability
    disabled,
    ...props 
}, ref) => {
    return (
        <input 
            type={type}
            className={twMerge(`
                flex
                w-full
                rounded-md
                bg-neutral-700
                border
                border-transparent
                px-3
                py-3
                text-sm
                file:border-0
                file:bg-transparent
                file:font-medium
                placeholder:text-neutral-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                focus:outline-none
                `,
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
