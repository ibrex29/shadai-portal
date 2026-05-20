import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const CETableSkeleton = () => (
  <Paper
    variant="outlined"
    sx={{ borderRadius: 2, borderColor: "grey.300", overflow: "hidden" }}
  >
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "grey.100" }}>
          {["Title", "Author", "Keywords", "Section", "Status", "Submitted", "Actions"].map(
            (h) => (
              <TableCell key={h} sx={{ fontWeight: "bold" }}>
                {h}
              </TableCell>
            ),
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from(new Array(8)).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton animation="wave" variant="text" width="80%" /></TableCell>
            <TableCell><Skeleton animation="wave" variant="text" width={80} /></TableCell>
            <TableCell><Skeleton animation="wave" variant="text" width={60} /></TableCell>
            <TableCell><Skeleton animation="wave" variant="text" width={70} /></TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="rounded" width={70} height={22} sx={{ borderRadius: "12px" }} />
            </TableCell>
            <TableCell><Skeleton animation="wave" variant="text" width={80} /></TableCell>
            <TableCell align="right">
              <Skeleton animation="wave" variant="rounded" width={110} height={28} sx={{ borderRadius: "16px", ml: "auto" }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default CETableSkeleton;
