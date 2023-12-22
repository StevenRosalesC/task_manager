import { Module } from '../types/global.types';
export const calculateNumberPages = (total: number, perPage: number) => {
    const totalPages = Math.ceil(total / perPage);
    return totalPages;
}

export const modules:Module[] = [
    {
        name: 'Tareas',
        path: '/todos'
    },
]