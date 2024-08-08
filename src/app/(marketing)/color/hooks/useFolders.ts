import { useState } from 'react';

interface Folder {
    name: string;
    colors: string[];
}

function useFolders() {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [activeFolder, setActiveFolder] = useState<string>('');

    const addFolder = (name: string) => {
        setFolders([...folders, { name, colors: [] }]);
    };

    const deleteFolder = (folderName: string) => {
        setFolders(folders.filter((folder) => folder.name !== folderName));
    };

    // const addColor = (folderName: string, color: string) => {
    //     setFolders(folders.map((folder) =>
    //         folder.name === folderName
    //             ? { ...folder, colors: [...folder.colors, color] }
    //             : folder
    //     ));
    // };

    // const deleteColor = (folderName: string, colorToDelete: string) => {
    //     setFolders(folders.map((folder) =>
    //         folder.name === folderName
    //             ? { ...folder, colors: folder.colors.filter((color) => color !== colorToDelete) }
    //             : folder
    //     ));
    // };

    const moveColor = (fromFolder: string, toFolder: string, colorToMove: string) => {
        setFolders(folders.map((folder) => {
            if (folder.name === fromFolder) {
                return { ...folder, colors: folder.colors.filter((color) => color !== colorToMove) };
            } else if (folder.name === toFolder) {
                return { ...folder, colors: [...folder.colors, colorToMove] };
            } else {
                return folder;
            }
        }));
    };

    function addColor(folderName: string, color: string) {
        setFolders(folders.map((folder) =>
            folder.name === folderName
                ? { ...folder, colors: [...folder.colors, color] }
                : folder
        ));
    }

    function deleteColor(folderName: string, colorToDelete: string) {
        setFolders(folders.map((folder) =>
            folder.name === folderName
                ? { ...folder, colors: folder.colors.filter((color) => color !== colorToDelete) }
                : folder
        ));
    }


    return {
        folders,
        activeFolder,
        setActiveFolder,
        addFolder,
        deleteFolder,
        addColor,
        deleteColor,
        moveColor,
    };
}

export default useFolders;