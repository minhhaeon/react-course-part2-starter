import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
    previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: todoService.post,
        onMutate(variables) {
            const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
                variables,
                ...todos,
            ]);
            onAdd();

            return { previousTodos };
        },
        onSuccess: (savedServerTodo: Todo, newPostTodo) => {
            //approach: invalid the cache
            // queryClient.invalidateQueries({
            //   queryKey: ["todos"],
            // });
            //approach 2: updating the data in the cache
            // queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
            //   savedServerTodo,
            //   ...(todos || []),
            // ]);
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
                todos?.map((todo) => (todo === newPostTodo ? savedServerTodo : todo))
            );
        },
        onError: (error, newTodo, context) => {
            if (!context) return;
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
        },
    });
}
export default useAddTodo;