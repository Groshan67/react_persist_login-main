import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Box, AppBar, Toolbar, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "../api/axios";
const LOG_URL =
  "https://hlthub.services.centinsur.ir/api/log/thirdPartyServices?page=";

const columns = [
  { field: "createdAt", headerName: "CreatedAt" },
  { field: "updatedAt", headerName: "UpdatedAt" },
  { field: "createdBy", headerName: "CreatedBy" },
  { field: "updatedBy", headerName: "UpdatedBy" },
  { field: "requestBody", headerName: "RequestBody", flex: 1 },
  { field: "id", headerName: "ID" },
];

const PartyLogs = () => {
  const [errMsg, setErrMsg] = useState("");
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ON");
        setPageState((old) => ({ ...old, isLoading: true }));

        const response = await axios.get(
          LOG_URL + `${pageState.page}&size=${pageState.pageSize}`,

          JSON.stringify({}),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const json = await response.json();
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: json.data,
          total: json.total,
        }));
      } catch (err) {
        setErrMsg(err.message);
      }
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h4" component="div">
            thirdPartyServices Log
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <DataGrid
          autoHeight
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns}
        />
      </Container>
    </Box>
  );
};

export default PartyLogs;
