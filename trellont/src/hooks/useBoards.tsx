import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
    getBoards, 
    getBoardById, 
    getCardsByBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    createCard,
    updateCard,
    deleteCard,
    type CreateBoardInput,
    type UpdateBoardInput,
    type CreateCardInput,
    type UpdateCardInput
} from "../services/api"
import { useState } from "react"

export const useBoards = () => {
    const queryClient = useQueryClient()
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
        queryFn: () => getCardsByBoard(selectedBoardId || ""),
        enabled: !!selectedBoardId?.length
    })
    
    // Mutations para Boards
    const createBoardMutation = useMutation({
        mutationFn: (data: CreateBoardInput) => createBoard(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] })
        }
    })
    
    const updateBoardMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBoardInput }) => updateBoard(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['boards'] })
            queryClient.invalidateQueries({ queryKey: ['board', variables.id] })
        }
    })
    
    const deleteBoardMutation = useMutation({
        mutationFn: (id: string) => deleteBoard(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] })
            setSelectedBoardId(null)
        }
    })
    
    // Mutations para Cards
    const createCardMutation = useMutation({
        mutationFn: (data: CreateCardInput) => createCard(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['cards', variables.boardId] })
            queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] })
        }
    })
    
    const updateCardMutation = useMutation({
        mutationFn: ({ cardId, data }: { cardId: string; data: UpdateCardInput }) => updateCard(cardId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards', selectedBoardId] })
            queryClient.invalidateQueries({ queryKey: ['board', selectedBoardId] })
        }
    })
    
    const deleteCardMutation = useMutation({
        mutationFn: (cardId: string) => deleteCard(cardId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards', selectedBoardId] })
            queryClient.invalidateQueries({ queryKey: ['board', selectedBoardId] })
        }
    })
    
    return {
        // Data
        boards: boards.data,
        selectedBoard: selectedBoard.data,
        cards: cards.data,
        loading: boards.isLoading || selectedBoard.isLoading || cards.isLoading,
        error: boards.error || selectedBoard.error || cards.error,
        
        // Setters
        setSelectedBoardId,
        
        // Board Mutations
        createBoard: createBoardMutation.mutateAsync,
        updateBoard: (id: string, data: UpdateBoardInput) => updateBoardMutation.mutateAsync({ id, data }),
        deleteBoard: deleteBoardMutation.mutateAsync,
        isCreatingBoard: createBoardMutation.isPending,
        isUpdatingBoard: updateBoardMutation.isPending,
        isDeletingBoard: deleteBoardMutation.isPending,
        
        // Card Mutations
        createCard: createCardMutation.mutateAsync,
        updateCard: (cardId: string, data: UpdateCardInput) => updateCardMutation.mutateAsync({ cardId, data }),
        deleteCard: deleteCardMutation.mutateAsync,
        isCreatingCard: createCardMutation.isPending,
        isUpdatingCard: updateCardMutation.isPending,
        isDeletingCard: deleteCardMutation.isPending,
    }
}