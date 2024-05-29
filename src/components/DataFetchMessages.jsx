import Alert from "@mui/material/Alert"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

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
