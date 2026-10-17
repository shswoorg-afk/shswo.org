import { queryOptions } from "@tanstack/react-query";
import { getActivites } from "../../serverFunc/activites.crud";
export const activitiesQueryOptions = queryOptions({

    queryKey : ["activities"],
    queryFn : () => getActivites(),
    staleTime : 30_000
})
