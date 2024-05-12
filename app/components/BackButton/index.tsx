import { useNavigate } from "@remix-run/react";
import Typography from "../Typography";

type BackButtonProps = {
  to?: string;
  text: string;
};

const BackButton = ({ to, text }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography type="h1">
        {" "}
        <button onClick={() => (to ? navigate(to) : navigate(-1))}>
          {"<"} {text}
        </button>
      </Typography>
      ;
    </>
  );
};

export default BackButton;
