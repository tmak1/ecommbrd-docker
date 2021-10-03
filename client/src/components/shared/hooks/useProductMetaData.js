import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const useProductMetaData = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sreachTermFromUrl = query.get('search');
  const pageFromUrl = query.get('page');
  const perPageFromUrl = query.get('perPage');

  const [searchTerm, setSearchTerm] = useState(sreachTermFromUrl || '');
  const [page, setPage] = useState(pageFromUrl || 1);
  const [perPage, setPerPage] = useState(perPageFromUrl || 5);
  useEffect(() => {
    console.log('useEffect', searchTerm);
    history.push(
      `/products?search=${searchTerm}&page=${page}&perPage=${perPage}`
    );
  }, [searchTerm, page, perPage]);
  console.log('rendering hook');
  return { page, setPage, searchTerm, setSearchTerm, perPage, setPerPage };
};
