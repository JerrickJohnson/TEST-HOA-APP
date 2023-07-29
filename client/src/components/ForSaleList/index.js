import React, { useEffect } from 'react';
import ForSaleItem from '../ForSaleItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SALEITEMS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SALEITEMS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ForSaleList() {
  const [state, dispatch] = useStoreContext();

  const { currentSaleCategory } = state;

  const { loading, data } = useQuery(QUERY_SALEITEMS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_SALEITEMS,
        saleitems: data.saleitems,
      });
      data.saleitems.forEach((SaleItem) => {
        idbPromise('saleitems', 'put', SaleItem);
      });
    } else if (!loading) {
      idbPromise('saleitems', 'get').then((SaleItem) => {
        dispatch({
          type: UPDATE_SALEITEMS,
          saleitems: saleitems,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterSaleItems() {
    if (!currentSaleCategory) {
      return state.saleitems;
    }

    return state.saleitems.filter(
      (SaleItem) => SaleItem.salecategory._id === currentSaleCategory
    );
  }

  return (
    <div className="my-2">
      <h2>For Sale:</h2>
      {state.saleitems.length ? (
        <div className="flex-row">
          {filterSaleItems().map((SaleItem) => (
            <ForSaleItem
              key={SaleItem._id}
              _id={SaleItem._id}
              image={SaleItem.image}
              name={SaleItem.name}
              description={SaleItem.description}
              price={SaleItem.price}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any Items yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ForSaleList;