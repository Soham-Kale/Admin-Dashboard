import React from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Grid from '@mui/material/Grid2';
import MetricsCard from "../MetricsCard/MetricsCard";
import RecentOrder from './RecentOrder';

interface Metric {
  title: string;
  value: string;
  change?: string;
}

interface MetricsCard {
  title: string;
  metrics: Metric[];
}

const Dashboard: React.FC = () => {

  return (
    <Box sx={{ 
      display: 'flex',
      bgcolor: '#F8F9FA',
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      {/* Sidebar */}
      <Box sx={{ 
        flexShrink: 0,
        position: { xs: 'static', md: 'fixed' },
        width: { xs: '100%', md: '240px' },
        left: 0,
      }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1,
        ml: { xs: 0, md: '240px' },
        p: { xs: 2, sm: 3 },
        width: { xs: '100%', md: 'calc(100% - 240px)' }
      }}>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            <MetricsCard/>
          </Grid>
        </Grid>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 2, sm: 3 }, 
          mt: { xs: 2, sm: 3 },
          height: { xs: 'auto', lg: '400px' }
        }}>
          <Box sx={{ 
            flex: 1,
            bgcolor: 'white',
            borderRadius: 2,
            marginLeft: { xs: 0, md: 8 },
            p: { xs: 2, sm: 3 },
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            order: { xs: 2, lg: 1 }, // Changes order on mobile
            minHeight: { xs: '300px', sm: '400px' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box>
                <Typography variant="h6">Summary</Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 7 Days
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ 
            width: { xs: '100%', lg: '384px' },
            order: { xs: 1, lg: 2 } // Changes order on mobile
          }}>
            <RecentOrder />
          </Box>
        </Box>
      </Box>
      
    </Box>
  );
};

export default Dashboard;