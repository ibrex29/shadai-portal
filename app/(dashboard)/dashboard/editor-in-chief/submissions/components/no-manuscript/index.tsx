import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  title?: string;
  description: string;
  width?: number;
  height?: number;
}

export default function NoTicket({
  src,
  alt,
  title,
  description,
  width,
  height,
}: Props) {
  return (
    <Box
      component="section"
      minHeight="60vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Image src={src} alt={alt} width={width} height={height} />
      <Typography color="primary" mt={1} fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="subtitle1" my={1} fontWeight={550}>
        {description}
      </Typography>
    </Box>
  );
}
