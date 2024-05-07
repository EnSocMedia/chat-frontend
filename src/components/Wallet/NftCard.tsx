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
  collectionName: string;
}

export default function NftCard({
  image,
  name,
  tradeurl,
  collectionName,
}: NftCardProps) {
  return (
    <Card className="!h-[420px]">
      <CardMedia sx={{ height: 300, width: 360 }} image={image} title="green" />
      <CardContent className="bg-[#202020] h-[120px] !pb-4">
        {name && (
          <Typography
            color="white"
            gutterBottom
            variant="h5"
            className="flex gap-2 !text-[16px]"
            component="div"
          >
            <span className="font-bold"> Name :</span>
            <span> {name}</span>
          </Typography>
        )}
        {collectionName && (
          <Typography
            color="white"
            gutterBottom
            variant="h5"
            className="flex gap-2 !text-[16px]"
            component="div"
          >
            <span className="font-bold">Collection :</span>
            <span> {collectionName}</span>
          </Typography>
        )}
        <Button
          target="_blank"
          href={tradeurl}
          className="!bg-[#9400FF] !text-white !mb-4 "
          size="small"
          color="primary"
        >
          Trade
        </Button>
      </CardContent>
    </Card>
  );
}
