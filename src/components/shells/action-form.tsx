
import { ReactNode } from 'react';

type AccessibleFormProps = {
    action?: (formData: FormData) => void | Promise<void>;
    children?: ReactNode;
    ariaLabel?: string;
}

export function AccessibleForm({ action, children, ariaLabel }: AccessibleFormProps) {
    return (
        <form action={action} aria-label={ariaLabel}>
            {children}
        </form>
    );

}
