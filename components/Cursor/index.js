import React, { useEffect, useState } from "react";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { useTheme } from "next-themes";
import fallingTextData from "../../data/fallingText.json";

const Cursor = () => {
  const theme = useTheme();
  const [mount, setMount] = useState();

  const getCusomColor = () => {
    if (theme.theme === "dark") {
      return "#fff";
    } else if (theme.theme === "light") {
      return "#000";
    }
  };

  useEffect(() => {
    setMount(true);
  }, []);
  return (
    <>
      {mount && (
        <CustomCursor
          targets={[".link"]}
          customClass="custom-cursor"
          dimensions={30}
          fill={getCusomColor()}
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetOpacity={0.5}
          targetScale={2}
        />
      )}
    </>
  );
};

const FallingTextBackground = () => {
  const [textArray, setTextArray] = useState([]);

  useEffect(() => {
    // Load falling text data dynamically
    setTextArray(fallingTextData.text);
  }, []);

  return (
    <div className="falling-text-background">
      {textArray.map((text, index) => (
        <div key={index} className="falling-text">
          {text}
        </div>
      ))}
    </div>
  );
};

export default FallingTextBackground;
