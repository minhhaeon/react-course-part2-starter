import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import todoService from "../services/todoService";

const useTotos = () => {
    return useQuery<Todo[], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: todoService.getAll,
        staleTime: 10 * 1000
    });
}
export default useTotos;