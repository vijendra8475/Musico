import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import { AddAlbumDialog } from "./Components/AddAlbumDialog";
import { AlbumTable } from "./Components/AlbumTable";

export const AlbumTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Library className='h-5 w-5 text-emerald-500' />
              Albums
            </CardTitle>
            <CardDescription>Manage your Albums here...</CardDescription>
          </div>

          <AddAlbumDialog />
          {/* <Button>+</Button> */}
        </div>
      </CardHeader>
      <CardContent>
        <AlbumTable />
      </CardContent>
    </Card>
  );
};
