import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export const AddAlbumDialog = () => {
    const [albumDiaOpen, setAlbumDiaOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const imageFileRef = useRef<HTMLInputElement>(null);

    const [newAlbum, setNewAlbum] = useState({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!imageFile) {
                return toast.error("Upload the image file.");
            }
            const formData = new FormData();

            formData.append("title", newAlbum.title);
            formData.append("artist", newAlbum.artist);
            formData.append("releaseYear", newAlbum.releaseYear.toString());
            formData.append("imageFile", imageFile);

            await axiosInstance.post("/admin/album", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setNewAlbum({
                artist: "",
                title: "",
                releaseYear: new Date().getFullYear(),
            });
            setImageFile(null);
            setAlbumDiaOpen(false);

            toast.success("Album Created Sucessfully");
        } catch (error: any) {
            toast.error("Failed to creat Album " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={albumDiaOpen} onOpenChange={setAlbumDiaOpen}>
            <DialogTrigger asChild>
                <Button className='bg-violet-500 hover:bg-violet-600 text-white'>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Album
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-zinc-900 border-zinc-700'>
                <DialogHeader>
                    <DialogTitle>Add New Album</DialogTitle>
                    <DialogDescription>
                        Add a new album to your collection
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <input
                        type='file'
                        ref={imageFileRef}
                        onChange={handleImageSelect}
                        accept='image/*'
                        className='hidden'
                    />
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
                        onClick={() => imageFileRef.current?.click()}>
                        <div className='text-center'>
                            <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                {!imageFile && <Upload className='h-6 w-6 text-zinc-400' />}
                            </div>
                            <div className='text-sm text-zinc-400 mb-2'>
                                {imageFile ? imageFile.name : "Upload album artwork"}
                            </div>
                            <Button variant='outline' size='sm' className='text-xs'>
                                Choose File
                            </Button>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Album Title</label>
                        <Input
                            value={newAlbum.title}
                            onChange={(e) =>
                                setNewAlbum({ ...newAlbum, title: e.target.value })
                            }
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter album title'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Artist</label>
                        <Input
                            value={newAlbum.artist}
                            onChange={(e) =>
                                setNewAlbum({ ...newAlbum, artist: e.target.value })
                            }
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter artist name'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Release Year</label>
                        <Input
                            type='number'
                            disabled
                            value={newAlbum.releaseYear}
                            onChange={(e) =>
                                setNewAlbum({
                                    ...newAlbum,
                                    releaseYear: parseInt(e.target.value),
                                })
                            }
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter release year'
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant='outline'
                        onClick={() => setAlbumDiaOpen(false)}
                        disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className='bg-violet-500 hover:bg-violet-600'
                        disabled={
                            isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
                        }>
                        {isLoading ? "Creating..." : "Add Album"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
