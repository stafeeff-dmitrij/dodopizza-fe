import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '../../lib';


const buttonVariants = cva(
	'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-3xl text-sm font-normal ring-offset-background ' +
	'transition duration-300 ' +
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
	'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#e2e2e9] disabled:text-[#abadba]' +
	'[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-[#ED5D08]',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-[#FFD0B2]',
				light:
					'bg-muted text-muted-foreground hover:text-foreground',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-[#eb3b30]',
				link: 'text-foreground underline-offset-4 hover:text-primary hover:underline',
				block: 'bg-[#666565]',
			},
			size: {
				default: 'h-10 px-5 py-2',
				sm: 'h-8 px-4 font-light',
				lg: 'h-11 px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, children, disabled, loading, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				disabled={disabled}
				className={cn(
					buttonVariants({ variant, size, className }),
					{
						'opacity-50 pointer-events-none': loading,
					}
				)}
				ref={ref}
				{...props}>
				{!loading ? children : <Loader className="w-5 h-5 animate-spin" />}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };