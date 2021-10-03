import React, { useState, useEffect, createContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const ProductMetaDataContext = createContext({
  page: '',
  setPage: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  perPage: '',
  setPerPage: () => {},
  filters: [],
  setFilters: () => {},
  sort: '',
  setSort: () => {},
  rating: '',
  setRating: () => {},
});

const ProductMetaDataContextProvider = ({ children }) => {
  const {
    push,
    location: { pathname, search },
  } = useHistory();
  useLocation(); // don't delete this!
  const [query, setQuery] = useState(new URLSearchParams(search));
  const searchTermFromUrl = query.get('search') || '';
  const ratingFromUrl = query.get('rating') || 3;
  const pageFromUrl = query.get('page') || 1;
  const perPageFromUrl = query.get('perPage') || 5;
  const filtersFromUrl = query.get('filters')?.split(',') || [];
  const sortFromUrl = query.get('sort') || 'price|DESC';

  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [rating, setRating] = useState(ratingFromUrl);
  const [page, setPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);
  const [filters, setFilters] = useState(filtersFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  useEffect(() => {
    setQuery(new URLSearchParams(search));
  }, [search]);

  useEffect(() => {
    if (pathname === '/products' && !query.toString()) {
      push(`/products?page=1&search=&rating=&perPage=&filters=&sort=`);
      setSearchTerm('');
      setPage(1);
      setFilters([]);
      setSort('price|DESC');
    }
  }, [push, query, pathname]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setRating(1);
      setFilters([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    push(
      `/products?page=1&search=${searchTerm}&rating=${rating}&perPage=${perPage}&filters=${filters}&sort=${sort}`
    );
    setPage(1);
  }, [push, searchTerm, rating, perPage, filters, sort]);

  useEffect(() => {
    push(
      `/products?page=${page}&search=${searchTerm}&rating=${rating}&perPage=${perPage}&filters=${filters}&sort=${sort}`
    );
  }, [push, page, searchTerm, rating, perPage, filters, sort]);

  return (
    <ProductMetaDataContext.Provider
      value={{
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        perPage,
        setPerPage,
        filters,
        setFilters,
        sort,
        setSort,
        rating,
        setRating,
      }}
    >
      {children}
    </ProductMetaDataContext.Provider>
  );
};

export default ProductMetaDataContextProvider;
