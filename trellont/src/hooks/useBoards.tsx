import { useQuery } from "@tanstack/react-query"
import { getBoards, getBoardById, getCards } from "../services/api"
import { useState } from "react"

export const useBoards = () => {
    const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null)
    const boards = useQuery({
        queryKey: ['boards'],
        queryFn: () => getBoards()
    })
    const selectedBoard = useQuery({
        queryKey: ['board', selectedBoardId],
        queryFn: () => getBoardById(selectedBoardId || ""),
        enabled: !!selectedBoardId?.length
    })
    
    const cards = useQuery({
        queryKey: ['cards', selectedBoardId],
        queryFn: () => getCards(selectedBoardId || ""),
        enabled: !!selectedBoardId?.length
    })
    return {
        boards: boards.data,
        selectedBoard: selectedBoard.data,
        cards: cards.data,
        loading: boards.isLoading || selectedBoard.isLoading,
        error: boards.error || selectedBoard.error,
        setSelectedBoardId
    }


}