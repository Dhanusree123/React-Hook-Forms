// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Box,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { useState, useEffect } from "react";
// import useDebounce from "../../hooks/useDebounce";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import { Edit } from "@mui/icons-material";
// // import BrandDelete from "./brand-delete";

// type Brand = {
//   id: string;
//   title: string;
//   active: string;
// };
// // type SearchBrandsProps = {
// //   onBrandSelect: (title: string) => void;
// // };
// const SEARCH_BRANDS = `
// query findBrandByTitle($title:String!){
// findBrandByTitle(title:$title){
//   id
//   title
//   active
//   }
// }
// `;

// export const BrandSearch = () => {
//   // const params = new URLSearchParams();
//   // const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const debouncedSearchBrand = useDebounce(searchTerm, 500);

//   const fetchBrandByTitle = async (
//     // event: React.ChangeEvent<HTMLInputElement>,
//     title: string
//   ) => {
//     // const term = event.target.value;
//     // setSearchTerm(debouncedSearchBrand);
//     // navigate(`${params.toString}`);

//     // if (term) {
//     //   setLoading(true);
//     //   params.set("search", term);
//     setLoading(true);
//     try {
//       const res = await axios.post("https://test-api.nine.deals/graphql", {
//         headers: { "Content-Type": "application/json" },

//         data: {
//           query: SEARCH_BRANDS,
//           variables: { title },
//         },
//       });

//       const { data } = res.data;
//       console.log(res);
//       if (data.findBrandByTitle) setBrands(data.findBrandByTitle);
//       else setBrands([]);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//     // } else {
//     //   params.delete("search");
//     //   setBrands([]);
//   };
//   useEffect(() => {
//     if (debouncedSearchBrand) {
//       fetchBrandByTitle(debouncedSearchBrand);
//     } else {
//       setBrands([]);
//     }
//   }, [debouncedSearchBrand]);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event?.target.value);
//   };

//   // useEffect(() => {
//   //   handleSearchChange();
//   // }, []);

//   return (
//     <Box>
//       <TextField
//         placeholder="search brand..."
//         variant="outlined"
//         fullWidth
//         value={searchTerm}
//         onChange={handleSearch}
//       />

//       {loading && <Typography>Loading...</Typography>}
//       <Grid component="div" sx={{ ml: 0, mr: 0 }}>
//         <TableContainer sx={{ maxWidth: "75%", px: 2, py: 3 }}>
//           <Table sx={{ minWidth: 300, padding: "10px" }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
//                   Id
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
//                   Title
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
//                   Active
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {brands.length > 0 ? (
//                 brands.map((b: any, index: number) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       {/* {page * rowsPerPage + index + 1} */}1
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "left" }}>{b.title}</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       {b.active ? "Active" : "Inactive"}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       <IconButton>
//                         <Edit
//                           fontSize="small"
//                           sx={{ marginRight: 2 }}
//                           // onClick={() => editBrand(b.id)}
//                         />
//                       </IconButton>

//                       {/* <BrandDelete id={b.id} onDeleteSuccess={getBrands} /> */}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center"></TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>
//     </Box>
//   );
// };

// export default BrandSearch;
