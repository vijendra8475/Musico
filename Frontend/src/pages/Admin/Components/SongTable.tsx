import { useMusicStore } from '@/Store/useMusicStore'
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar, Trash2 } from 'lucide-react';

export const SongTable = () => {
    const { isLoading, songs, deleteSong } = useMusicStore();

    if (isLoading) return <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-2">Loading songs...</span>
    </div>
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className='hover:bg-zinc-800/50'>
                <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    songs.map(song => (
                        <TableRow key={song._id}>
                            <TableCell>
                                <img src={song.imageUrl} alt={song.title} className='size-10 rounded object-cover ' />
                            </TableCell>
                            <TableCell>{song.title}</TableCell>
                            <TableCell>{song.artist}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Calendar className='size-4' />
                                    {song.createdAt.split('T')[0]}
                                </span>
                            </TableCell>

                            <TableCell>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        variant={'ghost'}
                                        size={'sm'}
                                        className='text-red-400 hover:bg-zinc-400/10 hover:text-red-300'
                                        onClick={() => deleteSong(song._id)}
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
