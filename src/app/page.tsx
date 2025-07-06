import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
              <Button variant="link">sit amet</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            excepturi inventore impedit enim nisi, fuga ea, distinctio sunt
            possimus consectetur molestiae esse. Ullam vero sint, accusantium
            culpa suscipit quaerat accusamus!
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
