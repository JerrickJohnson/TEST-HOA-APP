import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_SALECATEGORIES,
  UPDATE_CURRENT_SALECATEGORY,
} from '../../utils/actions';
import { QUERY_SALECATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function SaleCategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { salecategories } = state;

  const { loading, data: salecategoryData } = useQuery(QUERY_SALECATEGORIES);

  useEffect(() => {
    if (salecategoryData) {
      dispatch({
        type: UPDATE_SALECATEGORIES,
        salecategories: salecategoryData.salecategories,
      });
      salecategoryData.salecategories.forEach((salecategory) => {
        idbPromise('salecategories', 'put', salecategory);
      });
    } else if (!loading) {
      idbPromise('salecategories', 'get').then((salecategories) => {
        dispatch({
          type: UPDATE_SALECATEGORIES,
          salecategories: salecategories,
        });
      });
    }
  }, [salecategoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_SALECATEGORY,
      currentSaleCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {salecategories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default SaleCategoryMenu;