import { useMemo } from 'react';
import strings from '../strings';

const useStrings = () => {
  const localizedStrings = useMemo(() => {
    return strings;
  }, []);

  return localizedStrings;
};

export default useStrings;
