import React from 'react';
import { ReactNode } from 'react';

export type ShimmerButtonProps = {
    shimmerColor?: string;
    shimmerSize?: string;
    shimmerDuration?: string;
    borderRadius?: string;
    background?: string;
    className?: string;
    children?: ReactNode;
    ButtonHTMLAttributes<HTMLButtonElement>;
}


