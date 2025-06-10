import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/Store/useMusicStore"
import { Calendar, Music, Trash2 } from "lucide-react"
import { useEffect } from "react"

export const AlbumTable = () => {
    const { fetchAlbum, albums, deleteAlbum } = useMusicStore()
    useEffect(() => {
        fetchAlbum()
    }, [fetchAlbum])

    return (
        <Table>
            <TableCaption>A list Albums appears here...</TableCaption>
            <TableHeader className='hover:bg-zinc-800/50'>
                <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    albums.map(album => (
                        <TableRow key={album._id}>
                            <TableCell>
                                <img src={album.imageUrl} alt={album.title} className='size-10 rounded object-cover ' />
                            </TableCell>
                            <TableCell>{album.title}</TableCell>
                            <TableCell>{album.artist}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Calendar className='size-4' />
                                    {album.releaseYear}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Music className='size-4' />
                                    {album.songs.length} Songs
                                </span>
                            </TableCell>

                            <TableCell>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        variant={'ghost'}
                                        size={'sm'}
                                        className='text-red-400 hover:bg-zinc-400/10 hover:text-red-300'
                                        onClick={() => deleteAlbum(album._id)}
                                    >
                                        <Trash2 className='size-4' />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    )
}
