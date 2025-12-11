import { Button, CircularProgress } from "@mui/material";
import { memo } from "react";

interface ICustomButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  variant?: "contained" | "outlined" | "text";
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  loadingPosition?: "start" | "end";
  loadingIndicator?: React.ReactNode;
}

// Default loading indicator defined outside to prevent recreation
const defaultLoadingIndicator = <CircularProgress size={16} />;

const CustomButton = (props: ICustomButtonProps) => {
  const {
    type = "button",
    disabled = false,
    color = "primary",
    variant = "contained",
    onClick,
    children,
    className,
    startIcon,
    endIcon,
    size = "medium",
    fullWidth = false,
    loading = false,
    loadingPosition = "start",
    loadingIndicator = defaultLoadingIndicator,
  } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      type={type}
      disabled={disabled}
      className={className}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      loadingPosition={loadingPosition}
      loadingIndicator={loadingIndicator}
    >
      {children}
    </Button>
  );
};

export default memo(CustomButton);
