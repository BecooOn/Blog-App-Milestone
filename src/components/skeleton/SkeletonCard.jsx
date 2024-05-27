import React from 'react';
import { Box, Grid, Skeleton, List, ListItem, Divider, ListItemText, Typography, IconButton, Button, Pagination } from '@mui/material';
import { ThumbUpAlt as ThumbUpAltIcon, Comment as CommentIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

export default function SkeletonCard({ page, setPage }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '24px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Grid
          item
          xs={12}
          sm={9}
          order={{ xs: 2, sm: 1 }}
          sx={{
            width: { xs: '100vw', sm: '100vw', md: '50vw' },
            borderTop: '1px solid gray',
            borderRight: '1px solid gray',
            borderLeft: '1px solid gray',
            borderBottom: 'none',
            p: 3,
            height: '800px',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': { width: '0px' },
            textAlign: { xs: 'center', sm: 'left' },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 700,
              bgcolor: 'background.paper',
            }}
          >
            {Array.from(new Array(3)).map((_, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: {
                      xs: 'center',
                      sm: 'flex-start',
                    },
                    alignItems: 'center',
                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                    textAlign: { xs: 'center', sm: 'left' },
                    position: 'relative',
                  }}
                >
                  <Box sx={{ m: 2 }}>
                    <Skeleton variant="rectangular" width={200} height={118} />
                  </Box>

                  <Box sx={{ flex: 1, ml: { sm: 2 } }}>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                          <Skeleton width="80%" />
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography component="span">
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Typography>
                          <Box my={2} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Button variant="contained" color="secondary" disabled>
                              <Skeleton width={80} />
                            </Button>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: {
                                xs: 'center',
                                sm: 'flex-start',
                              },
                              gap: 3,
                              my: 2,
                              position: { sm: 'absolute' },
                              bottom: { sm: 0 },
                              right: { sm: 0 },
                              textAlign: { xs: 'center', sm: 'left' },
                            }}
                          >
                            <Box>
                              <VisibilityIcon />
                              <Skeleton width={30} />
                            </Box>
                            <Box>
                              <CommentIcon />
                              <Skeleton width={30} />
                            </Box>
                            <IconButton aria-label="add to favorites" disabled>
                              <ThumbUpAltIcon />
                              <Skeleton width={30} />
                            </IconButton>
                          </Box>
                        </Box>
                      }
                    />
                  </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                m: 4,
              }}
            >
              <Pagination count={0} page={page} onChange={(_, value) => setPage(value)} variant="outlined" color="primary" />
            </Box>
          </List>
        </Grid>
        {/* <Grid
          item
          xs={12}
          sm={3}
          order={{ xs: 1, sm: 2 }}
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
        >
          <ListItem sx={{ display: 'block' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Skeleton variant="circular" width={70} height={70} />
            </Box>
            <ListItemText
              primary={<Skeleton width="60%" />}
              secondary={
                <Box>
                  <Typography><Skeleton width="40%" /></Typography>
                  <Typography><Skeleton width="50%" /></Typography>
                  <Typography><Skeleton width="30%" /></Typography>
                  <Typography><Skeleton width="70%" /></Typography>
                </Box>
              }
            />
          </ListItem>
        </Grid> */}
      </Box>
    </Box>
  );
}
