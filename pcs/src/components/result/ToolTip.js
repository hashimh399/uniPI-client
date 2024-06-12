import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IoInformationCircle } from "react-icons/io5";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function CustomizedTooltips({ resultCardInfo }) {
  return (
    <div>
      {/* <LightTooltip title="Add">
        <Button>Light</Button>
      </LightTooltip>
      <BootstrapTooltip title="Add">
        <Button>Bootstrap</Button>
      </BootstrapTooltip> */}
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{resultCardInfo.heading}</Typography>
            {resultCardInfo.text}
          </React.Fragment>
        }
      >
        <Button
          sx={{ color: "gray", fontSize: 15 }}
          className="text-2xl text-slate-600"
        >
          <IoInformationCircle />{" "}
        </Button>
      </HtmlTooltip>
    </div>
  );
}
