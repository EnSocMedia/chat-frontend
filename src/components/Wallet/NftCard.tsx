import Image from "next/image";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface NftCardProps {
  image: string;
  name: string;
  tradeurl: string;
}

export default function NftCard({ image, name, tradeurl }: NftCardProps) {
  return (
    <Card className="!h-[450px]">
      <CardMedia sx={{ height: 300, width: 360 }} image={image} title="green" />
      <CardContent className="bg-[#202020] h-[110px]">
        <Typography color="white" gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions className="bg-[#202020]">
        <Button
          target="_blank"
          href={tradeurl}
          className="!bg-[#9400FF] !text-white !mb-10 "
          size="small"
          color="primary"
        >
          Trade
        </Button>
      </CardActions>
    </Card>
  );
}
