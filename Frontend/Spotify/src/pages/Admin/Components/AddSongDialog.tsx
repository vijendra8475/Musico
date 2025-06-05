import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { axiosInstance } from "@/lib/axios"
import { useMusicStore } from "@/Store/useMusicStore"
import { Plus, Upload } from "lucide-react"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

interface NewSong{
    artist : string,
    title : string,
    album : string,
    duration : string
}

export const AddSongDialog = () => {
    const { albums } = useMusicStore()
    const [isLoading, setIsLoading] = useState(false)
    const [songDialogOpen, setSongDialogOpen] = useState(false)

    const [newSong, setNewSong] = useState<NewSong>({
        title: '',
        artist: '',
        album: '',
        duration: '0'
    })

    const audioInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<{ audio: File | null, image: File | null }>({
        audio: null,
        image: null
    })

    const handleSubmit = async () => {
        console.log(newSong);
        
        setIsLoading(true)

        try {
            if(!files.audio || !files.image) {
                toast.error('Upload both audio and video file')
            }
            const formData = new FormData()

            formData.append('title', newSong.title)
            formData.append('artist', newSong.artist)
            formData.append('duration', newSong.duration)
            
            if(newSong.album && newSong.album !== 'none') {
                formData.append('albumId', newSong.album)
            }

            formData.append('imageFile', files.image)
            formData.append('audioFile' ,files.audio)

            await axiosInstance.post('/admin/song', formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })

            setNewSong({
                artist : '',
                title : '',
                duration :'',
                album : ''
            })

            toast.success('Song Added Sucessfully');
        } catch (error : any) {
            toast.error('Failed to Add Song ' + error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
                    <Plus className="size-4 mr-2" />
                    Add Song
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900 border-zinc-800 max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add a Song</DialogTitle>
                    <DialogDescription>Add a song to your music library</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <input
                        type="file"
                        hidden
                        accept="audio/*"
                        ref={audioInputRef}
                        onChange={e => setFiles(prev => ({ ...prev, audio: e.target.files![0] }))}
                    />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={e => setFiles(prev => ({ ...prev, image: e.target.files![0] }))}
                    />

                    {/* Image upload */}
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            {files.image ? (
                                <div className='space-y-2'>
                                    <div className='text-sm text-emerald-500'>Image selected:</div>
                                    <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                </div>
                            ) : (
                                <>
                                    <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                        <Upload className='h-6 w-6 text-zinc-400' />
                                    </div>
                                    <div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
                                    <Button variant='outline' size='sm' className='text-xs'>
                                        Choose File
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Audio upload */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Audio File</label>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full'>
                                {files.audio ? files.audio.name.slice(0) : "Choose Audio File"}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Artist</label>
                        <Input value={newSong.artist}
                            onChange={e => setNewSong({ ...newSong, artist: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input value={newSong.title}
                            onChange={e => setNewSong({ ...newSong, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Duration (in seconds)</label>
                        <Input value={newSong.duration}
                            onChange={e => setNewSong({ ...newSong, duration: e.target.value || '0' })}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Album (Optional)</label>
                        <Select
                            value={newSong.album}
                            onValueChange={(value) => setNewSong({ ...newSong, album: value })}
                        >
                            <SelectTrigger className='bg-zinc-800 border-zinc-700 w-full'>
                                <SelectValue placeholder='Select album' />
                            </SelectTrigger>
                            <SelectContent className='bg-zinc-800 border-zinc-700'>
                                <SelectItem value='none'>No Album (Single)</SelectItem>
                                {albums.map((album) => (
                                    <SelectItem key={album._id} value={album._id}>
                                        {album.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <DialogFooter>
					<Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
