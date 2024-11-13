import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Replacing `interface` with `type` for ButtonProps, avoiding empty interface warning
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    // Optional: Add additional custom props if needed, such as `variant` for different styles
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(`
                w-full
                rounded-full
                bg-blue-500
                border
                border-transparent
                px-3
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-black
                font-bold
                hover:opacity-75
                transition
                `,
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children || "Button"} {/* Default text in case `children` is empty */}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
