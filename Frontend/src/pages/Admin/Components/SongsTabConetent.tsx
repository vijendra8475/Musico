import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import { SongTable } from "./SongTable"
import { AddSongDialog } from "./AddSongDialog"

export const SongsTabConetent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-emerald-500" />
              Song
            </CardTitle>
            <CardDescription>Manage your music track</CardDescription>
          </div>

            <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <SongTable />
      </CardContent>
    </Card>
  )
}
