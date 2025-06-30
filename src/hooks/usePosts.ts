import { useQuery, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    page: number,
    pageSize: number,
    userId?: number | null
}

// const usePosts = (userId: number | null) => {
const usePosts = (query: PostQuery) => {

    return useInfiniteQuery<Post[], Error>({
        //queryKey: !userId ? ['posts'] :['users', userId, 'posts'],
        queryKey: ['posts', query],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) =>
            axios
                .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        userId: query.userId,
                        _start: (pageParam as number - 1) * query.pageSize,
                        _limit: query.pageSize
                    }
                })
                .then(res => res.data),
        staleTime: 1 * 60 * 1000,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, allPages)=>{
            return lastPage.length > 0 ? allPages.length + 1: undefined;
        }
    });
}
export default usePosts;