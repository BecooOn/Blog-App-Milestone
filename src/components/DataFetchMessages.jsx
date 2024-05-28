import Alert from "@mui/material/Alert"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

export const ErrorMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="error">
      Oops! there is something wrong while getting data
    </Alert>
  )
}

export const NoDataMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="warning">
      There is no data
    </Alert>
  )
}

export const NoBlogMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="warning">
      There is no blog
    </Alert>
  )
}

export const CardSkeleton = ({ children }) => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      <Skeleton variant="rectangular">{children}</Skeleton>
    </Stack>
  )
}
