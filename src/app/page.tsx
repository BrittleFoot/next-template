import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Hello World</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </CardDescription>
            <CardAction>
              <Image
                src="/cat.avif"
                alt="cat"
                width={500}
                height={500}
                className="aspect-square h-12 w-12 rounded-full object-cover"
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            excepturi inventore impedit enim nisi, fuga ea, distinctio sunt
            possimus consectetur molestiae esse. Ullam vero sint, accusantium
            culpa suscipit quaerat accusamus!
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
