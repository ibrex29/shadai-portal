import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TableSkeleton = () => (
  <Paper
    variant="outlined"
    sx={{ borderRadius: 2, borderColor: "grey.300", overflow: "hidden" }}
  >
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "grey.100" }}>
          {["Title", "Author", "Submitted", "Status"].map((h) => (
            <TableCell key={h} sx={{ fontWeight: "bold" }}>{h}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from(new Array(6)).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton animation="wave" variant="text" width="75%" /></TableCell>
            <TableCell><Skeleton animation="wave" variant="text" width={90} /></TableCell>
            <TableCell><Skeleton animation="wave" variant="text" width={80} /></TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="rounded" width={70} height={22} sx={{ borderRadius: "12px" }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default TableSkeleton;
