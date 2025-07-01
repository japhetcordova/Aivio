import { OctagonAlert } from "lucide-react";
interface Props{
    title: string,
    description: string
}

export const ErrorState = ( { title, description }: Props ) =>{
    return(
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 rounded-xl bg-background p-12 shadow-md border border-border">
        <OctagonAlert className="h-12 w-12 text-destructive" />
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
    )
}