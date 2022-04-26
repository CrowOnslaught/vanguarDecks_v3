import React, { useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { ResponsiveValue, Text } from "@chakra-ui/react";

interface styledDescriptionProps extends Record<string, any> {
  text: string;
  align: ResponsiveValue<any> | undefined;
  className?: string;
  fontSize?: string;
}

const StyledText = styled(Text)`
  overflow: scroll;
  overflow-y: auto;
  overflow-x: hidden;

  .icon {
    width: 20px !important;
    height: 20px !important;
    display: inline;
  }

  .icon-large {
    width: 70px !important;
    height: 24px !important;
  }

  .card {
    margin-bottom: -4px;
  }

  .red {
    color: red;
  }

  .tag {
    border-radius: 2px;
    color: white;
    padding: 1px 3px 1px 3px;
  }

  .act {
    background-color: blue;
  }
  .cont {
    background-color: red;
  }
  .auto {
    background-color: green;
  }
  .cost {
    background-color: black;
    border: solid white 1px;
    padding: 1px 2px 1px 2px;
  }
  .oneTurn {
    background-color: darkmagenta;
  }

  .circle {
    color: goldenrod;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(p: any) => p.theme.colors.purple[700]};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(p: any) => p.theme.colors.teal[300]};
    border-radius: 10px;
  }
`;

const StyledCardDescription = (props: styledDescriptionProps) => {
  const getIconRoute = (name: string) => {
    return `/assets/icons/${name}.png`;
  };

  const styledText = useMemo(() => {
    if (!props || !props.text) return "";

    return props.text
      .replace(/\[AUTO\]/g, " <span class='tag auto'>[AUTO]</span> ")
      .replace(/\[ACT\]/g, " <span class='tag act'>[ACT]</span> ")
      .replace(/\[CONT\]/g, " <span class='tag cont'>[CONT]</span> ")

      .replace(/\[COST\]/g, " <span class='tag cost'>COST</span> ")
      .replace(/\[1\/turn\]/g, "<span class='tag oneTurn'> 1/Turn </span>")

      .replace(/\(VC\)/g, "<span class='tag circle'> (VC) </span>")
      .replace(/\(VC\/RC\)/g, "<span class='tag circle'> (VC/RC) </span>")
      .replace(/\(RC\)/g, "<span class='tag circle'> (RC) </span>")
      .replace(/\(GC\)/g, "<span class='tag circle'> (GC) </span>")
      .replace(/\(RC\/GC\)/g, "<span class='tag circle'> (RC/GC) </span>")

      .replace(
        /\[Power\]/g,
        "<img src=" +
          getIconRoute("power") +
          " alt:'[Power]' class='icon'></img>"
      )
      .replace(
        /\[Shield\]/g,
        "<img src=" +
          getIconRoute("shield") +
          " alt:'[Shield]' class='icon'></img>"
      )

      .replace(
        /\[Rest\]/g,
        "<img src=" +
          getIconRoute("rest") +
          " alt:'[Rest]' class='icon card'></img>"
      )
      .replace(
        /\[Stand\]/g,
        "<img src=" +
          getIconRoute("stand") +
          " alt:'[Stand]' class='icon card'></img>"
      )

      .replace(
        /\[overDress\]/g,
        "<img src=" +
          getIconRoute("oDress") +
          " alt:'[overDress]' class='icon-large card'></img>"
      )

      .replace(
        /\[Critical\]/g,
        "<img src=" +
          getIconRoute("crit") +
          " alt:'[Critical]' class='icon card'></img>"
      )
      .replace(
        /\[Front\]/g,
        "<img src=" +
          getIconRoute("front") +
          " alt:'[Front]' class='icon card'></img>"
      );
  }, [props]);

  if (!styledText) return <></>;

  return (
    <StyledText dangerouslySetInnerHTML={{ __html: styledText }} {...props} />
  );
};

export default StyledCardDescription;
