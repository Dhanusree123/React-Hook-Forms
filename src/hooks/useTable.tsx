import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<number>(() => {
    const params = new URLSearchParams(location.search);
    const initialPage = Number(params.get("page")) || 0;
    return initialPage;
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onChangePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      navigate(`/brands?page=${newPage}`);
      console.log(newPage);
    },
    [navigate]
  );

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rows = parseInt(event?.target.value, 10);
      console.log(rows);
      setRowsPerPage(rows);
      setPage(1);
      navigate(`/brands?page=0`);
    },
    [navigate]
  );

  return {
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  };
};
