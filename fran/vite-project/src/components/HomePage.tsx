import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface HomePageProps {
    onNavigateToBoard: () => void
}

export function HomePage({ onNavigateToBoard }: HomePageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-indigo-600">
                        Trello Clone
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                        Organiza tus tareas de manera eficiente
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button
                        onClick={onNavigateToBoard}
                        size="lg"
                        className="w-full"
                    >
                        Crear Tablero
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}