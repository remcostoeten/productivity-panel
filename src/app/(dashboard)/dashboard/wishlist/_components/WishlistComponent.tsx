"use client";

import { AnimatePulse } from "@/components/atoms/AnimatePulse";
import Flex from "@/components/atoms/Flex";
import Truncate from "@/components/atoms/Truncate";
import { WishlistSkeleton } from "@/components/effect/skeletons";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
} from "@/components/ui/";
import PopoutForm from "@/components/ui/PopoutForm";
import {
    deleteEntireWishlist,
    updateWishlistItem,
} from "@/core/server/server-actions/wishlist";
import useWishlistStore from "@/core/stores/useWishlistStore";
import { WishlistItem } from "@/core/types/types.wishlist";
import { AnimatePresence, motion } from "framer-motion";
import { EditIcon, LinkIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function WishlistComponent({ userId }: { userId: string }) {
    const {
        wishlists,
        isLoading,
        error,
        fetchWishlists,
        addWishlist,
        addWishlistItem,
        removeWishlistItem,
        updateWishlistName,
        updateWishlistBudget,
    } = useWishlistStore();

    const [localWishlists, setLocalWishlists] = useState([]);
    const [isUpdateWishlistModalOpen, setIsUpdateWishlistModalOpen] =
        useState(false);
    const [isUpdateWishlistItemModalOpen, setIsUpdateWishlistItemModalOpen] =
        useState(false);
    const [selectedWishlistId, setSelectedWishlistId] = useState<string | null>(
        null,
    );
    const [newName, setNewName] = useState("");
    const [newBudget, setNewBudget] = useState("");
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [newItemDescription, setNewItemDescription] = useState("");

    useEffect(() => {
        if (userId) {
            fetchWishlists(userId);
        }
    }, [userId, fetchWishlists]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        const filteredWishlists = wishlists.filter((wishlist) => wishlist != null);
        setLocalWishlists(filteredWishlists);
    }, [wishlists]);

    const handleAddWishlist = async (data: { name: string; budget: any }) => {
        try {
            await addWishlist(userId, data.name, Number(data.budget));
            await fetchWishlists(userId); // Fetch updated wishlists after adding
            toast.success("Wishlist added successfully");
        } catch (error) {
            toast.error("Failed to add wishlist");
        }
    };

    const handleAddWishlistItem = async (
        wishlistId: string,
        data: Record<string, string | string[]>,
    ) => {
        const { name, price, description, url } = data;

        try {
            await addWishlistItem(
                wishlistId,
                name as string,
                Number(price),
                description as string,
            );

            await fetchWishlists(userId);
            toast.success("Item added successfully");
        } catch (error) {
            toast.error("Failed to add item");
        }
    };

    const removeEntireWishlist = async (wishlistId: string) => {
        try {
            await deleteEntireWishlist(wishlistId);
            setLocalWishlists((prev) =>
                prev.filter((wishlist) => wishlist && wishlist.id !== wishlistId),
            );
            toast.success("Wishlist removed successfully");
        } catch (error) {
            toast.error("Failed to remove wishlist");
        }
    };

    const handleRemoveSingleWishlistItem = async (
        wishlistId: string,
        itemId: string,
    ) => {
        try {
            await removeWishlistItem(itemId);
            setLocalWishlists((prev) =>
                prev.map((wishlist) => {
                    if (wishlist && wishlist.id === wishlistId) {
                        return {
                            ...wishlist,
                            items: (wishlist.items || []).filter(
                                (item) => item.id !== itemId,
                            ),
                        };
                    }
                    return wishlist;
                }),
            );
            toast.success("Item removed successfully");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    };

    const handleUpdateWishlist = async () => {
        if (selectedWishlistId && (newName || newBudget !== "")) {
            try {
                if (newName) {
                    await updateWishlistName(selectedWishlistId, newName);
                }
                if (newBudget !== "") {
                    await updateWishlistBudget(selectedWishlistId, Number(newBudget));
                }

                setIsUpdateWishlistModalOpen(false);
                setNewName("");
                setNewBudget("");
                setSelectedWishlistId(null);
                toast.success("Wishlist updated successfully");

                await fetchWishlists(userId);
            } catch (error) {
                toast.error("Failed to update wishlist");
            }
        } else {
            toast.error("No changes to update or invalid wishlist selected");
        }
    };

    const handleUpdateWishlistItem = async () => {
        if (
            !selectedItemId ||
            (!newItemName && !newItemPrice && !newItemDescription)
        ) {
            toast.error("No changes to update or invalid item selected");
            return;
        }

        try {
            const updateData: Record<string, string | number> = {};
            if (newItemName) updateData.name = newItemName;
            if (newItemPrice) updateData.price = Number(newItemPrice);
            if (newItemDescription) updateData.description = newItemDescription;

            await updateWishlistItem(selectedItemId, updateData);
            await fetchWishlists(userId);
            toast.success("Item updated successfully");
            setIsUpdateWishlistItemModalOpen(false);
            resetItemUpdateForm();
        } catch (error) {
            toast.error("Failed to update item");
        }
    };

    const resetItemUpdateForm = () => {
        setSelectedItemId(null);
        setNewItemName("");
        setNewItemPrice("");
        setNewItemDescription("");
    };

    const remainingColor = (budget: number, total: number) => {
        const remaining = budget - total;
        if (remaining < 0) {
            return "text-error";
        } else if (remaining > 0 && remaining < budget / 4) {
            return "text-yellow-500";
        }
    };

    if (isLoading) return <WishlistSkeleton />;

    return (
        <div className="w-full max-w-4xl max-w-screen mx-auto">
            <div className="grid max-w-screen gap-4">
                <div className="grid gap-6 max-w-screen">
                    <AnimatePresence>
                        {localWishlists.length === 0 ? (
                            <p className="text-2xl">
                                There are no lists yet! Get busy<AnimatePulse>✍️</AnimatePulse>
                            </p>
                        ) : null}
                        {localWishlists.map(
                            (wishlist) =>
                                wishlist && (
                                    <motion.div
                                        key={wishlist.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <Card className="hover:shadow-lg hover:shadow-[#ff6c00]/10 transition-shadow duration-700">
                                            <CardHeader className="bg-[#161616] px-6 py-4">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h2 className="text-lg font-semibold">
                                                        {wishlist.name}
                                                    </h2>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="text-neutral-400 hover:text-neutral-300"
                                                            onClick={() => {
                                                                setSelectedWishlistId(wishlist.id);
                                                                setIsUpdateWishlistModalOpen(true);
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="text-neutral-400 hover:text-neutral-300"
                                                            onClick={() => removeEntireWishlist(wishlist.id)}
                                                        >
                                                            <Trash2Icon size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground">
                                                    Budget: €{wishlist.budget?.toFixed(2) || "0.00"}.-
                                                </p>
                                            </CardHeader>
                                            <CardContent className="bg-[#0c0c0c] px-6 py-4">
                                                <ul className="grid gap-4">
                                                    {(wishlist.items || []).map((item: WishlistItem) => (
                                                        <li
                                                            key={item.id}
                                                            className="grid grid-cols-[1fr_auto] pb-4 border-b items-center gap-4"
                                                        >
                                                            <div className="grid gap-1">
                                                                <h3 className="font-medium">
                                                                    <Truncate text={item.name} chars="50" />
                                                                </h3>
                                                                {item.description ? (
                                                                    <p className="text-sm text-muted-foreground">
                                                                        <Truncate
                                                                            chars="100"
                                                                            text={item.description}
                                                                        />
                                                                    </p>
                                                                ) : null}
                                                                {item.url && (
                                                                    <a
                                                                        href={item.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                                                    >
                                                                        <LinkIcon size={16} />
                                                                        <span className="text-sm">
                                                                            {item.url.replace(/(^\w+:|^)\/\//, "")}
                                                                        </span>
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center justify-between flex-wrap text-wrap break-words">
                                                                    €{item.price}.-
                                                                </div>
                                                                <Flex gap="1">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="text-neutral-400 hover:text-neutral-300"
                                                                        onClick={() => {
                                                                            setSelectedItemId(item.id);
                                                                            setNewItemName(item.name);
                                                                            setNewItemPrice(item.price.toString());
                                                                            setNewItemDescription(
                                                                                item.description || "",
                                                                            );
                                                                            setIsUpdateWishlistItemModalOpen(true);
                                                                        }}
                                                                    >
                                                                        <EditIcon />
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="text-neutral-400 hover:text-neutral-300"
                                                                        onClick={() =>
                                                                            handleRemoveSingleWishlistItem(
                                                                                wishlist.id,
                                                                                item.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <TrashIcon size={16} />
                                                                    </Button>
                                                                </Flex>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Flex items="center" justify="between" className="mt-4">
                                                    <PopoutForm
                                                        label="Add Item"
                                                        fields={[
                                                            {
                                                                type: "text",
                                                                name: "name",
                                                                placeholder: "Item Name",
                                                            },
                                                            {
                                                                type: "number",
                                                                name: "price",
                                                                placeholder: "Price",
                                                                prefix: "€",
                                                            },
                                                            {
                                                                type: "textarea",
                                                                name: "description",
                                                                placeholder: "Description",
                                                            },
                                                        ]}
                                                        onSubmit={(data) =>
                                                            handleAddWishlistItem(wishlist.id, data)
                                                        }
                                                        defaultWidth={148}
                                                        defaultHeight={52}
                                                        expandedWidth={320}
                                                        expandedHeight={320}
                                                    />
                                                    <p className="flex flex-col sm:block">
                                                        Remaining:
                                                        <span
                                                            className={remainingColor(
                                                                wishlist.budget,
                                                                (wishlist.items || []).reduce(
                                                                    (total, item) => total + (item.price || 0),
                                                                    0,
                                                                ),
                                                            )}
                                                        >
                                                            €
                                                            {(
                                                                wishlist.budget -
                                                                (wishlist.items || []).reduce(
                                                                    (total, item) => total + (item.price || 0),
                                                                    0,
                                                                )
                                                            ).toFixed(2)}
                                                            .-
                                                        </span>
                                                    </p>
                                                </Flex>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ),
                        )}
                    </AnimatePresence>
                    <PopoutForm
                        label="Add Wishlist"
                        fields={[
                            { type: "text", name: "name", placeholder: "Wishlist Name" },
                            {
                                type: "number",
                                name: "budget",
                                placeholder: "Budget",
                                prefix: "€",
                            },
                        ]}
                        onSubmit={handleAddWishlist}
                        defaultWidth={156}
                        defaultHeight={52}
                        expandedWidth={320}
                        expandedHeight={240}
                    />
                </div>
            </div>
            <Dialog
                open={isUpdateWishlistItemModalOpen}
                onOpenChange={(open) => {
                    setIsUpdateWishlistItemModalOpen(open);
                    if (!open) resetItemUpdateForm();
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Wishlist Item</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newItemName" className="text-right">
                                New Name
                            </Label>
                            <Input
                                id="newItemName"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newItemPrice" className="text-right">
                                New Price
                            </Label>
                            <Input
                                id="newItemPrice"
                                type="number"
                                value={newItemPrice}
                                onChange={(e) => setNewItemPrice(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newItemDescription" className="text-right">
                                New Description
                            </Label>
                            <Input
                                id="newItemDescription"
                                value={newItemDescription}
                                onChange={(e) => setNewItemDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleUpdateWishlistItem}>Update Item</Button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isUpdateWishlistModalOpen}
                onOpenChange={setIsUpdateWishlistModalOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Wishlist</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newName" className="text-right">
                                New Name
                            </Label>
                            <Input
                                id="newName"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newBudget" className="text-right">
                                New Budget
                            </Label>
                            <Input
                                id="newBudget"
                                type="number"
                                value={newBudget}
                                onChange={(e) => setNewBudget(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleUpdateWishlist}>Update Wishlist</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
