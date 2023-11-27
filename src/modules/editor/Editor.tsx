import { createContext, useCallback, useMemo, useReducer, useState } from 'react';
import MosaicRoot from "./MosaicRoot";
import useProjectionContext, {ProjectionContext} from '../../state/useProjectionContext';



const Editor = () => {
  const projectionContext = useProjectionContext();
  if (!projectionContext) return null;
  return (
    <ProjectionContext.Provider value={projectionContext}>
      <MosaicRoot />
    </ProjectionContext.Provider>
  );
};

export default Editor;
