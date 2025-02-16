import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  stats: StatItem[];
  variant?: 'default' | 'orders';
  iconColor?: string;
}

interface StatItem {
  label: string;
  value: string;
  change?: string;
}

const CardComponent = ({
  icon,
  title,
  stats,
  variant = 'default',
  iconColor = "#F3910F"
}: CardProps) => {
  return (
    <Card sx={{
      p: 2.5,
      borderRadius: 2,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      height: '100%',
      bgcolor: 'white'
    }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box sx={{ 
          bgcolor: iconColor, 
          borderRadius: 2,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#BEC0CA',
              fontSize: '13px'
            }}
          >
            This Week
          </Typography>
          <KeyboardArrowDown sx={{ 
            color: "#BEC0CA",
            fontSize: 20
          }}/>
        </Box>
      </Box>

      {/* Content */}
      {variant === 'orders' ? (
        <Box>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#1A1C21',
              fontSize: '14px',
              mb: 1
            }}
          >
            {title}
          </Typography>
          <Grid container spacing={2}>
            {stats.map((stat) => (
              <Grid size={{ xs: 4}} key={stat.label}>
                <Box>
                  <Typography 
                    sx={{ 
                      color: '#8B909A',
                      fontSize: '13px',
                      mb: 0.5
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Box display="flex" alignItems="baseline" gap={0.5}>
                    <Typography 
                      sx={{ 
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#1A1C21'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    {stat.change && (
                      <Typography 
                        sx={{ 
                          fontSize: '12px',
                          color: stat.change.includes('+') ? '#4BB543' : '#FF4842'
                        }}
                      >
                        {stat.change}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Typography 
            sx={{ 
              color: '#1A1C21',
              fontSize: '14px',
              mb: 1
            }}
          >
            {title}
          </Typography>
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6}} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography 
                    sx={{ 
                      color: '#8B909A',
                      fontSize: '13px',
                      mb: 0.5
                    }}
                  >
                    {/* {stat.label} */}
                  </Typography>
                  <Box display="flex" alignItems="baseline" gap={0.5}>
                    <Typography 
                      sx={{ 
                        fontSize: '20px',
                        fontWeight: 500,
                        color: '#353535'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    {stat.change && (
                      <Typography 
                        sx={{ 
                          fontSize: '12px',
                          marginLeft: 1,
                          color: stat.change.includes('+') ? '#4BB543' : '#FCC11C'
                        }}
                      >
                        {stat.change}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Card>
  );
};

const DashboardCards = () => {
  return (
    <Box sx={{ width: '100%', p: 3 , marginTop: 8}}>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Abandoned Cart Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3.5 }} sx={{marginLeft: { sx: "0", md: 5, } }}>
          <CardComponent
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#F3910F" />
              <g clip-path="url(#clip0_144_13267)">
                <path d="M24.6667 26.3333C25.1269 26.3333 25.5 25.9602 25.5 25.5C25.5 25.0398 25.1269 24.6667 24.6667 24.6667C24.2064 24.6667 23.8333 25.0398 23.8333 25.5C23.8333 25.9602 24.2064 26.3333 24.6667 26.3333Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.5 26.3333C15.9602 26.3333 16.3333 25.9602 16.3333 25.5C16.3333 25.0398 15.9602 24.6667 15.5 24.6667C15.0398 24.6667 14.6667 25.0398 14.6667 25.5C14.6667 25.9602 15.0398 26.3333 15.5 26.3333Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.83334 8.83334H12.1667L14.4 19.9917C14.4762 20.3753 14.6849 20.72 14.9896 20.9653C15.2943 21.2105 15.6756 21.3408 16.0667 21.3333H24.1667C24.5578 21.3408 24.939 21.2105 25.2437 20.9653C25.5484 20.72 25.7571 20.3753 25.8333 19.9917L27.1667 13H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_144_13267">
                  <rect width="20" height="20" fill="white" transform="translate(8 8)" />
                </clipPath>
              </defs>
            </svg>
            }
            title="Abandoned Cart"
            stats={[
              { label: "Customers", value: "20%", change: "+0.00%" },
              { label: "", value: "1,180", change: "+0.00%" }
            ]}
          />
        </Grid>

        {/* Customers Card */}
        <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
          <CardComponent
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#F3910F" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9929 20.6723C19.0671 20.6723 21.6946 21.1382 21.6946 22.999C21.6946 24.8598 19.0846 25.339 15.9929 25.339C12.9179 25.339 10.2913 24.8773 10.2913 23.0157C10.2913 21.154 12.9004 20.6723 15.9929 20.6723Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.993 18.0165C13.9746 18.0165 12.338 16.3807 12.338 14.3623C12.338 12.344 13.9746 10.7082 15.993 10.7082C18.0105 10.7082 19.6471 12.344 19.6471 14.3623C19.6546 16.3732 18.0296 18.009 16.0188 18.0165H15.993Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M21.7359 17.068C23.0701 16.8805 24.0976 15.7355 24.1001 14.3497C24.1001 12.9838 23.1042 11.8505 21.7984 11.6363" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M23.4962 20.2768C24.7887 20.4693 25.6912 20.9227 25.6912 21.856C25.6912 22.4985 25.2662 22.9152 24.5795 23.176" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            }
            title="Customers"
            stats={[
              { label: "Active", value: "1,250", change: "+15.80%" },
              { label: "", value: "1,180", change: "-4.90%" }
            ]}
          />
        </Grid>

        {/* Orders Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <CardComponent
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#F3910F" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7615 25.9167H14.805C12.2496 25.9167 10.2893 24.9937 10.8461 21.279L11.4945 16.2447C11.8377 14.3911 13.0201 13.6817 14.0574 13.6817H22.5395C23.5921 13.6817 24.7058 14.4445 25.1024 16.2447L25.7508 21.279C26.2237 24.5742 24.3168 25.9167 21.7615 25.9167Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M21.8759 13.4987C21.8759 11.5103 20.264 9.89836 18.2756 9.89836V9.89836C17.3181 9.89431 16.3984 10.2718 15.7199 10.9475C15.0414 11.6231 14.66 12.5412 14.66 13.4987V13.4987" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M20.747 17.2515H20.7089" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M15.8881 17.2515H15.8499" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            }
            title=""
            variant="orders"
            stats={[
              { label: "All Orders", value: "0" },
              { label: "Pending", value: "0" },
              { label: "Completed", value: "0", change: "+0.00%" }
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCards;