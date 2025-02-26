import { useCallback, useEffect, useState } from "react";
import { Get } from "../../../components/api/api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import { IResource } from "../../../types/resources";
import CustomTable from "../../../components/custom-table/CustomTable";
import { ITableColumn } from "../../../types/common";
import CustomBreadCrumbs from "../../../components/custom-bread-crumbs/CustomBreadCrumbs";
import { Edit } from "@mui/icons-material";
import { DeleteResource } from "../delete-resource";

const ActionComponent = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row">
      <IconButton>
        <Edit onClick={() => navigate(`/resource/${id}/edit`)} />
      </IconButton>
      <DeleteResource id={id} />
    </Stack>
  );
};

const COLUMNS: ITableColumn[] = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "name",
    label: "Name",
    textTransform: "capitalize",
  },
  {
    key: "pantone_value",
    label: "Pantone Value",
    textTransform: "capitalize",
  },
  {
    key: "year",
    label: "Year",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: null,
    label: "Actions",
    action: (data) => <ActionComponent id={data.id.toString()} />,
  },
];

const Resources = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const initialPage = Number(params.get("page")) || 1;

  const [resources, setResources] = useState<IResource[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await Get("resource", page, 6);
      setResources(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.log(err);
    }
  }, [page]);

  const handlePageChange = (_: unknown, value: number) => {
    if (value > 1) {
      params.set("page", value.toString());
    } else {
      params.delete("page");
    }
    setPage(value);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <CustomBreadCrumbs path="/resources" pathName="Resources" />
          <Button variant="contained" onClick={() => navigate("/resource/new")}>
            Add resource
          </Button>
        </Box>
        <Card sx={{ marginTop: 3 }}>
          <CustomTable columns={COLUMNS} data={resources} />
        </Card>
        <Stack alignItems="center" marginTop={3}>
          <Pagination
            color="primary"
            shape="rounded"
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Resources;
