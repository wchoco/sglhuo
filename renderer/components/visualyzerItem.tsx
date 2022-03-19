import { Card, CardActionArea } from "@mui/material";
import Link from "next/link";

type Props = {
  name: string;
  href: string;
};

export function VisualyzerItem(props: Props) {
  return (
    <Link href={props.href}>
      <CardActionArea>
        <Card
          sx={{
            textAlign: "center",
            paddingTop: 3,
            paddingBottom: 3,
            paddingRight: 1,
            paddingLeft: 1,
          }}
        >
          {props.name}
        </Card>
      </CardActionArea>
    </Link>
  );
}
