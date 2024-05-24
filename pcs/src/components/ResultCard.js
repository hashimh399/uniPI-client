import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logoBg from "../assets/login.png";
export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345, padding: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://img.freepik.com/free-vector/analysis-financial-activities-online-service-platform-business-character-reviewing-company-s-financial-operation-online-financial-plan-flat-vector-illustration_613284-1056.jpg?t=st=1716551932~exp=1716555532~hmac=0cece6c841da4ed57effe8e1f67a7ce7568b600e21876031930ea6d225148f51&w=740"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Results
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
