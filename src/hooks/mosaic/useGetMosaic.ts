import useSWR from 'swr';
import fetcher from '../fetcher'

import { generateGrid } from './generateData';



export interface MosaicDetails {
  dimensions: number;
}

interface GetProjectsVars {
  resourceKey: string|null;
}

const useGetWorldMosaic = (vars: GetProjectsVars) => {
  const { data, error, isLoading, mutate } = useSWR(vars.resourceKey ? `https://breezy-orange-forest.glitch.me/mosaic/${vars.resourceKey}` : undefined, fetcher)

  return {
    data: data as MosaicDetails,
    isLoading,
    isError: error,
    mutate
  }
}

export default useGetWorldMosaic;

export const getWorldMosaic = () => {
  const grid = generateGrid();
  return grid;
}
