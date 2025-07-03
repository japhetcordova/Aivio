import Image from "next/image";

interface Props{
    title: string,
    description: string
}

export const EmptyState = ( { title, description }: Props ) =>{
    return(
    <div className="flex flex-col items-center justify-center p-6">
      <Image src="/empty.svg" alt="empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md text-center mx-auto">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-md text-muted-foreground w-{200px}">{description}</p>
      </div>
    </div>
    )
}