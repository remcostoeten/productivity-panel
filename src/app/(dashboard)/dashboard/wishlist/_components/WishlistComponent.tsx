"use client";

// File: src/components/WishlistComponent.tsx

import { AnimatePulse } from "@/components/atoms/AnimatePulse";
import { Flex } from "@/components/atoms/Flex";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/";
import PopoutForm from "@/components/ui/PopoutForm";
import { useWishlistStore } from "@/core/stores/useWishlistStore";
import { Wishlist, WishlistItem } from "@/core/types/types.wishlist";
import { AnimatePresence, motion } from "framer-motion";
import { EditIcon, FolderIcon, FolderPlusIcon, LinkIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function WishlistComponent({ userId }: { userId: string }) {
  const {
    wishlists,
    folders,
    isLoading,
    error,
    fetchWishlists,
    fetchFolders,
    addWishlist,
    addWishlistItem,
    removeWishlistItem,
    updateWishlistName,
    updateWishlistBudget,
    updateWishlistItem,
    createFolder,
    updateFolder,
    deleteFolder,
    addWishlistToFolder,
    removeWishlistFromFolder,
  } = useWishlistStore();

  const [localWishlists, setLocalWishlists] = useState<Wishlist[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isUpdateWishlistModalOpen, setIsUpdateWishlistModalOpen] = useState(false);
  const [isUpdateWishlistItemModalOpen, setIsUpdateWishlistItemModalOpen] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<string | null>(null);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newWishlistBudget, setNewWishlistBudget] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [isMovingWishlist, setIsMovingWishlist] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchWishlists(userId);
      fetchFolders(userId);
    }
  }, [userId, fetchWishlists, fetchFolders]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    setLocalWishlists(wishlists.filter((wishlist) => wishlist != null));
  }, [wishlists]);

  const handleAddWishlist = async (data: { name: string; budget: string }) => {
    try {
      await addWishlist(userId, data.name, Number(data.budget));
      await fetchWishlists(userId);
      toast.success("Wishlist added successfully");
    } catch (error) {
      toast.error("Failed to add wishlist");
    }
  };

  const handleAddWishlistItem = async (
    wishlistId: string,
    data: Record<string, string | string[]>,
  ) => {
    const { name, price, description } = data;
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

  const handleRemoveWishlist = async (wishlistId: string) => {
    try {
      await removeWishlistItem(wishlistId);
      setLocalWishlists((prev) =>
        prev.filter((wishlist) => wishlist.id !== wishlistId),
      );
      toast.success("Wishlist removed successfully");
    } catch (error) {
      toast.error("Failed to remove wishlist");
    }
  };

  const handleRemoveWishlistItem = async (
    wishlistId: string,
    itemId: string,
  ) => {
    try {
      await removeWishlistItem(itemId);
      setLocalWishlists((prev) =>
        prev.map((wishlist) => {
          if (wishlist.id === wishlistId) {
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
    if (selectedWishlistId && (newWishlistName || newWishlistBudget !== "")) {
      try {
        if (newWishlistName) {
          await updateWishlistName(selectedWishlistId, newWishlistName);
        }
        if (newWishlistBudget !== "") {
          await updateWishlistBudget(selectedWishlistId, Number(newWishlistBudget));
        }
        setIsUpdateWishlistModalOpen(false);
        setNewWishlistName("");
        setNewWishlistBudget("");
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
      await updateWishlistItem(
        selectedItemId,
        newItemName,
        Number(newItemPrice),
        newItemDescription,
      );
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

  const handleCreateFolder = async () => {
    try {
      await createFolder(userId, newFolderName);
      setIsCreateFolderModalOpen(false);
      setNewFolderName("");
      await fetchFolders(userId);
      toast.success("Folder created successfully");
    } catch (error) {
      toast.error("Failed to create folder");
    }
  };

  const handleUpdateFolder = async (folderId: string, newName: string) => {
    try {
      await updateFolder(folderId, newName);
      await fetchFolders(userId);
      toast.success("Folder updated successfully");
    } catch (error) {
      toast.error("Failed to update folder");
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder(folderId);
      await fetchFolders(userId);
      setSelectedTab("all");
      toast.success("Folder deleted successfully");
    } catch (error) {
      toast.error("Failed to delete folder");
    }
  };

  const handleMoveWishlist = async () => {
    if (!selectedWishlistId || !selectedFolderId) {
      toast.error("Please select a wishlist and a folder");
      return;
    }

    try {
      await addWishlistToFolder(selectedWishlistId, selectedFolderId);
      await fetchWishlists(userId);
      setIsMovingWishlist(false);
      setSelectedWishlistId(null);
      setSelectedFolderId(null);
      toast.success("Wishlist moved successfully");
    } catch (error) {
      toast.error("Failed to move wishlist");
    }
  };

  const handleRemoveWishlistFromFolder = async (wishlistId: string, folderId: string) => {
    try {
      await removeWishlistFromFolder(wishlistId, folderId);
      await fetchWishlists(userId);
      toast.success("Wishlist removed from folder");
    } catch (error) {
      toast.error("Failed to remove wishlist from folder");
    }
  };

  const remainingColor = (budget: number, total: number) => {
    const remaining = budget - total;
    if (remaining < 0) {
      return "text-error";
    } else if (remaining > 0 && remaining < budget / 4) {
      return "text-yellow-500";
    }
    return "";
  };

  const renderWishlists = (wishlists: Wishlist[]) => {
    return (
      <AnimatePresence>
        {wishlists.length === 0 ? (
          <p className="text-2xl">
            There are no lists yet! Get busy<AnimatePulse>✍️</AnimatePulse>
          </p>
        ) : (
          wishlists.map((wishlist) => (
            <motion.div
              key={wishlist.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="hover:shadow-lg hover:shadow-[#ff6c00]/10 transition-shadow duration-700">
                <CardHeader className="bg-[#161616] px-6 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">{wishlist.name}</h2>
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
                        onClick={() => handleRemoveWishlist(wishlist.id)}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-300"
                        onClick={() => {
                          setSelectedWishlistId(wishlist.id);
                          setIsMovingWishlist(true);
                        }}
                      >
                        <FolderIcon size={16} />
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
                          {item.description && (
                            <p className="text-sm text-muted-foreground">
                              <Truncate chars="100" text={item.description} />
                            </p>
                          )}
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
                                setNewItemDescription(item.description || "");
                                setIsUpdateWishlistItemModalOpen(true);
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-neutral-400 hover:text-neutral-300"
                              onClick={() => handleRemoveWishlistItem(wishlist.id, item.id)}
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
                        { type: "text", name: "name", placeholder: "Item Name" },
                        {
                          type: "number",
                          name: "price",
                          placeholder: "Price",
                          prefix: "€",
                        },
                        {
                          type: "textarea",
                          name: "type: "textarea",
                          name: "description",
                          placeholder: "Description",
                        },
                      ]}
                      onSubmit={(data) => handleAddWishlistItem(wishlist.id, data)}
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
          ))
        )}
      </AnimatePresence>
    );
  };

  const renderModals = () => (
    <>
      <Dialog open={isCreateFolderModalOpen} onOpenChange={setIsCreateFolderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder Name"
          />
          <Button onClick={handleCreateFolder}>Create</Button>
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
              <Label htmlFor="newWishlistName" className="text-right">
                New Name
              </Label>
              <Input
                id="newWishlistName"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newWishlistBudget" className="text-right">
                New Budget
              </Label>
              <Input
                id="newWishlistBudget"
                type="number"
                value={newWishlistBudget}
                onChange={(e) => setNewWishlistBudget(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleUpdateWishlist}>Update Wishlist</Button>
        </DialogContent>
      </Dialog>

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

      <Dialog open={isMovingWishlist} onOpenChange={setIsMovingWishlist}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Move Wishlist to Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select onValueChange={(value) => setSelectedFolderId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleMoveWishlist}>Move Wishlist</Button>
        </DialogContent>
      </Dialog>
    </>
  );

  if (isLoading) return <WishlistSkeleton />;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Wishlists</TabsTrigger>
            {folders.map((folder) => (
              <TabsTrigger key={folder.id} value={folder.id}>
                {folder.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2">
            <Button onClick={() => setIsCreateFolderModalOpen(true)}>
              <FolderPlusIcon className="mr-2 h-4 w-4" />
              Create Folder
            </Button>
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

        <TabsContent value="all">
          <div className="grid gap-4">
            {renderWishlists(localWishlists)}
          </div>
        </TabsContent>

        {folders.map((folder) => (
          <TabsContent key={folder.id} value={folder.id}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{folder.name}</h2>
              <Button variant="outline" onClick={() => handleDeleteFolder(folder.id)}>
                Delete Folder
              </Button>
            </div>
            <div className="grid gap-4">
              {renderWishlists(localWishlists.filter((wishlist) => wishlist.folderId === folder.id))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {renderModals()}
    </div>
  );
}